const express = require('express');
const Order = require('../models/Order');
const router = express.Router();
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');

router.get('/', [auth, permit('courier', 'operator', 'admin', 'super_admin')], async (req, res) => {
  try {
    let orders;
    if (!req.query.status && !req.query.courier) {
      orders = await Order.find();
    } else if(req.query.courier) {
      orders = await Order.find({status: req.query.status, courier: req.query.courier}).populate('customer').populate('courier', 'username');
    } else {
      orders = await Order.find({status: { $in: req.query.status.split(',') }}).populate('customer').populate('courier', 'username');
    }
    res.send(orders);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.get('/:id', [auth, permit('courier', 'operator', 'admin', 'super_admin')], async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('customer');

    if (!order) {
      return res.status(404).send({message: 'Not found'});
    }
    res.send(order);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const orderData = {
      deliveryAddress: req.body.deliveryAddress,
      pickupAddress: req.body.pickupAddress,
      customer: req.body.customerId,
      paymentAmount: req.body.paymentAmount,
    };
    const order = new Order(orderData);
    await order.save();
    return res.send({message: `Заказ № ${order.orderNumber} успешно создан`});
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.delete('/:id', [auth, permit('operator', 'admin', 'super_admin')], async (req, res) => {
  try {
    await Order.findByIdAndRemove(req.params.id);
    return res.send({message: `Заказ успешно удален`});
  } catch (error) {
    res.status(400).send({error});
  }
});

router.patch('/:id/publish', [auth, permit('operator', 'admin', 'super_admin')], async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).send({message: 'Not found'});
    }
    order.status = "published";
    await order.save();
    return res.send({message: `Заказ № ${order.orderNumber} успешно опубликован`});
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.patch('/:id/accept', [auth, permit('super_admin', 'admin', 'courier')], async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).send({message: 'Not found'});
    }
    order.status = "accepted";
    order.acceptedAt = new Date;
    order.courier = req.user._id;
    await order.save();
    return res.send({message: `Заказ № ${order.orderNumber} успешно принят`});
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.patch('/:id/reject', [auth, permit('super_admin', 'admin', 'courier')], async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).send({message: 'Not found'});
    }
    const date = new Date;
    order.status = "rejected";
    order.reason = req.body.reason;
    order.historicalData.push({
      courier: req.user._id,
      reason: req.body.reason,
      date,
      status: 'rejected'
    })
    await order.save();
    return res.send({message: `Заказ № ${order.orderNumber} отменен Вами (${req.user.username})`});
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.patch('/:id/cancel', [auth, permit('super_admin', 'admin', 'courier')], async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).send({message: 'Not found'});
    }
    const date = new Date;
    order.status = "canceled";
    order.reason = req.body.reason;
    order.historicalData.push({
      courier: req.user._id,
      reason: req.body.reason,
      date,
      status: 'canceled'
    })
    await order.save();
    return res.send({message: `Заказ № ${order.orderNumber} отменен клиентом`});
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.patch('/:id/transfer', [auth, permit('super_admin', 'admin', 'operator')], async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).send({message: 'Not found'});
    }
    order.status = "accepted";
    order.acceptedAt = new Date;
    order.reason = null;
    order.courier = req.body.courierId;
    await order.save();
    return res.send({message: `Заказ № ${order.orderNumber} успешно передан курьеру`});
  } catch (error) {
    return res.status(400).send(error);
  }
});


router.patch('/:id/delivered', [auth, permit('super_admin', 'admin', 'courier')], async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).send({message: 'Not found'});
    }
    order.status = "delivered";
    order.deliveredAt = new Date;
    order.courierComment = req.body.comment;
    await order.save();
    return res.send({message: `Заказ № ${order.orderNumber} успешно доставлен`});
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.patch('/:id/edit', [auth, permit('super_admin', 'admin', 'operator')], async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
    if (!order) {
      return res.status(404).send({message: 'Not found'});
    };
    order.pickupAddress = req.body.pickupAddress;
    order.deliveryAddress = req.body.deliveryAddress;
    await order.save();
    return res.send({message: `Заказ № ${order.orderNumber} успешно изменен`});
  } catch (e) {
    return res.status(400).send(e);
  }
});


module.exports = router;