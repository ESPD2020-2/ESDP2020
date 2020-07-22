const express = require("express");

const auth = require("../middleware/auth");
const permit = require("../middleware/permit");
const moment = require('moment');

const Notification = require("../models/Notification");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const start = new Date(moment().startOf('day'));
  const end = new Date(moment().endOf("day"));
  try {
    const notifications = await Notification.find({recipients:{$in: [req.user._id]}, wasNotReadBy: { $nin: [ "$wasNotReadBy", req.user._id ] },createdAt: {"$gte": start, "$lt": end}}).populate('user', 'username displayName').sort({createdAt: -1})
    res.send(notifications)
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.get("/new", auth, async (req, res) => {
  const start = new Date(moment().startOf('day'));
  const end = new Date(moment().endOf("day"));
  try {
    const notifications = await Notification.find({recipients:{$in: [req.user._id]}, wasNotReadBy: { $in: [ "$wasNotReadBy", req.user._id ] }, createdAt: {"$gte": start, "$lt": end}}).populate('user', 'username displayName').sort({createdAt: -1})
    res.send(notifications)
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.patch("/", auth, async (req, res) => {
  try {
    const notifications = await Notification.updateMany({recipients:{$in: [req.user._id]}}, {$pull: {'wasNotReadBy': req.user._id.toString()}});
    res.send(notifications)
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = router;
