const express = require('express');
const moment = require('moment');
const Order = require('../models/Order');
const router = express.Router();
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');
const timezone = require('../constant');

router.get('/statistics', async (req, res) => {

  let start;
  let end;
  Date.prototype.daysInMonth = function() {
		return 33 - new Date(this.getFullYear(), this.getMonth(), 33).getDate();
  };
  const daysInMonth = new Date().daysInMonth() + 1;
  let orders;
  const result = {};
  
  const getStatisticsByPeriod = (orders, period, begin) => {
    const ordersRaw = [];
    const amountRaw = [];
    const ordersByPeriod = [];
    const amountByPeriod = [];
    orders.forEach(el => ordersRaw[el._id] = el.qty)
    orders.forEach(el => amountRaw[el._id] = el.totalAmount)
    for (let i = begin; i<period; i++) {
      ordersByPeriod.push(ordersRaw[i] === undefined ? 0 : ordersRaw[i])
      amountByPeriod.push(amountRaw[i] === undefined ? 0 : req.query.status === 'canceled' ? -amountRaw[i]: amountRaw[i])
    }
    return {ordersByPeriod,amountByPeriod}
  }

  try {
    if (req.query.period === 'today') {
      start = new Date(moment().startOf('day'));
      end = new Date(moment().endOf("day"));
      orders = await Order.aggregate([
        {$match: {"createdAt": {"$gte": start, "$lt": end}}},
        {$project: {paymentAmount:1, hour: {"$hour": {date: `$${req.query.status}At`, timezone}}}},
        {$group: {_id: "$hour", qty: {$sum: 1}, totalAmount : { $sum : { $toInt: "$paymentAmount"}}}}
      ]);
      result.statistics = getStatisticsByPeriod(orders, 24, 0)
    } 
    if (req.query.period === 'week') {
      start = new Date(moment().startOf('isoWeek'));
      end = new Date(moment().endOf("isoWeek"));
      orders = await Order.aggregate([
        {$match: {"createdAt": {"$gte": start, "$lt": end}}},
        {$project: { paymentAmount: 1, week: {"$isoDayOfWeek": {date: `$${req.query.status}At`,timezone}}}},
        {$group: {_id: "$week", qty: {$sum: 1}, totalAmount : { $sum : { $toInt: "$paymentAmount"}}}}
      ]);
      result.statistics = getStatisticsByPeriod(orders, 8, 1)
    }
    if (req.query.period === 'month') {
      start = new Date(moment().startOf('months'));
      end = new Date(moment().endOf("months"));
      orders = await Order.aggregate([
        {$match: {"createdAt": {"$gte": start, "$lt": end}}},
        {$project: { paymentAmount: 1, month: {"$dayOfMonth": {date: `$${req.query.status}At`,timezone}}}},
        {$group: { _id: "$month", qty: {$sum: 1}, totalAmount : { $sum : { $toInt: "$paymentAmount"}}}},
      ]);
      result.statistics = getStatisticsByPeriod(orders, daysInMonth, 1)
    }
    if (req.query.period === 'year') {
      start = new Date(moment().startOf('years'));
      end = new Date(moment().endOf("years"));
      orders = await Order.aggregate([
        {$match: {"createdAt": {"$gte": start, "$lt": end}}},
        {$project: { paymentAmount: 1, year: {"$month": {date: `$${req.query.status}At`,timezone}}}},
        {$group: { _id: "$year", qty: {$sum: 1}, totalAmount : { $sum : { $toInt: "$paymentAmount"}}}},
      ]);
      result.statistics = getStatisticsByPeriod(orders, 13, 1)
    }
    result.totalOrders = result.statistics.ordersByPeriod.reduce((acc, curr) => (acc+curr),0)
    result.totalAmount = result.statistics.amountByPeriod.reduce((acc, curr) => (acc+curr),0)
    result.status = req.query.status
    return res.send(result)
  } catch (error) {
    return res.status(400).send(error);
  }
});

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
    if (req.body.reason.reason === '') {
      return res.status(400).send({error: "Необходимо указать причину, попробуйте еще раз"});
    }
    const date = new Date;
    order.status = "rejected";
    order.reason = req.body.reason;
    order.historicalData.push({
      courier: req.body.reason.author,
      reason: req.body.reason.reason,
      date,
      status: 'rejected'
    })
    await order.save();
    return res.send({message: `Заказ № ${order.orderNumber} переведен в статус "Rejected"`});
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.patch('/:id/cancel', [auth, permit('super_admin', 'admin', 'operator')], async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).send({error: 'Not found'});
    }
    if (req.body.reason.reason === '') {
      return res.status(400).send({error: "Необходимо указать причину, попробуйте еще раз"});
    }
    const date = new Date;
    order.status = "canceled";
    order.canceledAt = date;
    order.reason = req.body.reason;
    order.historicalData.push({
      user: req.body.reason.author,
      reason: req.body.reason.reason,
      date,
      status: 'canceled'
    })
    await order.save();
    return res.send({message: `Заказ № ${order.orderNumber} переведен в статус "Canceled"`});
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
    if (!req.body.courierId) { 
      return res.status(400).send({error: 'Вы не выбрали курьера'})
    }
    order.status = "accepted";
    order.acceptedAt = new Date;
    order.reason = null;
    order.courier = req.body.courierId;
    await order.save();
    return res.send({message: `Заказ № ${order.orderNumber} успешно передан курьеру`});
  } catch (error) {
    return res.status(500).send(error);
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