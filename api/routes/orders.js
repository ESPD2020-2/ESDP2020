const express = require('express');

const auth = require('../middleware/auth');
const permit = require('../middleware/permit');

const Order = require('../models/Order');

const router = express.Router();

router.get('/',  async (req, res) => {
  console.log(req.query.status)
  const orders = await Order.find({status: req.query.status}).populate('customer');
  res.send(orders);
});

router.get('/:id', [auth, permit('courier', 'operator', 'admin', 'super_admin')], async (req, res) => {
  console.log(req.params.id)
  try {
    const order = await Order.findById(req.params.id).populate('customer');

    if (!order) {
      return res.status(404).send({message: 'No such order'});
    }

    res.send(order);
  } catch (error) {
    return res.status(500).send(error);
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
    return res.send(order._id);
  } catch (error) {
    console.log(error)
    return res.send(error);
  }
});

router.delete('/:id', [auth, permit('operator', 'admin', 'super_admin')], async (req, res) => {
  try {
    await Order.findByIdAndRemove(req.params.id);
    return res.send({message: 'Successfully deleted'});
  } catch (error) {
    console.log(error)
    res.status(500).send({error});
  }
});

router.patch('/:id/publish', [auth, permit('courier', 'operator', 'admin', 'super_admin')], async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).send({message: 'Not found'});
    }
    order.status = "published";
    await order.save();
    return res.send({message: 'Order is successfully changed'});
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.patch('/:id/accept', [auth, permit('courier', 'operator', 'admin', 'super_admin')], async (req, res) => {

  console.log(req.user)

  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).send({message: 'Not found'});
    }
    order.status = "accepted";
    order.courier = req.user._id;
    await order.save();
    return res.send({message: 'Order is successfully accepted'});
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.patch('/:id/edit', async (req, res) => {
  console.log(req.body)

  const order = await Order.findById(req.params.id)
  try {
    if (!order) {
      return res.status(404).send({message: 'Not found'});
    };
    order.pickupAddress = req.body.pickupAddress;
    order.deliveryAddress = req.body.deliveryAddress;
    await order.save();
    return res.send(order._id);
  } catch (e) {
    return res.status(500).send(e);
  }
});


module.exports = router;