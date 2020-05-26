const express = require('express');
const Order = require('../models/Order');
const router = express.Router();
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');

router.get('/', [auth, permit('courier', 'operator', 'admin', 'super_admin')], async (req, res) => {
  try {
    const orders = await Order.find({status: req.query.status}).populate('customer');
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
    console.log(error)
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

router.patch('/:id/accept', [auth, permit('courier')], async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).send({message: 'Not found'});
    }
    order.status = "accepted";
    order.courier = req.user._id;
    await order.save();
    return res.send({message: `Заказ № ${order.orderNumber} успешно принят`});
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.patch('/:id/edit', async (req, res) => {
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