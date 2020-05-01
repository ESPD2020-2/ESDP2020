const express = require('express');

const auth = require('../middleware/auth');
const permit = require('../middleware/permit');

const Order = require('../models/Order');

const router = express.Router();

router.get('/', [auth, permit('operator', 'admin', 'super_admin')], async (req, res) => {
  const orders = await Order.find();
  res.send(orders);
});

router.get('/:id', [auth, permit('courier', 'operator', 'admin', 'super_admin')], async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).send({message: 'No such order'});
    }

    res.send(order);
  } catch (error) {
    return res.send(error);
  }
});

router.post('/', [auth, permit('user', 'client', 'operator', 'admin', 'super_admin')], async (req, res) => {
  try {
    const orderData = {
      deliveryAddress: req.body.deliveryAddress,
      pickupAddress: req.body.pickupAddress,
      pickupEntityName: req.body.pickupEntityName,
      phoneNumber: req.body.phoneNumber,
      paymentAmount: req.body.paymentAmount,
      status: req.body.status,
      comments: req.body.comments,
    };

    const order = new Order(orderData);
    await order.save();

    return res.send(order);
  } catch (error) {
    return res.send(error);
  }
});

router.delete('/:id', [auth, permit('operator', 'admin', 'super_admin')], async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order.user.equals(req.user._id)) {
      order.delete();
      return res.send({message: 'Successfully deleted'});
    }
    return res.status(403).send({message: 'Oops, nothing'});

  } catch (error) {
    res.status(500).send({error});
  }
});

router.patch('/:id', [auth, permit('courier', 'operator', 'admin', 'super_admin')], async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).send({message: 'Not found'});
    }

    await Order.updateOne({_id: req.params.id}, order);
    return res.send({message: 'Order is successfully changed'});
  } catch (error) {
      return res.status(400).send(error);
  }
});

module.exports = router;