const express = require("express");
const wsAuth = require("../middleware/wsAuth");
const User = require("../models/User");
const Notification = require("../models/Notification");

const router = express.Router();

const connections = {};

const refreshData = async (userId, parsed) => {
  try {
    const user = await User.findById(userId);
    if (parsed) {
      user.geoData = parsed.geoData;
    } else {
      user.geoData = null;
    }
    await user.save();
    const couriers = await User.find(
      { role: "courier" },
      { username: 1, geoData: 1, displayName: 1, status: 1 }
    );
    Object.keys(connections).forEach((id) => {
      let connection;
      if (['admin', 'operator'].includes(connections[id].user.role)) {
        connection = connections[id];
        return connection.ws.send(
          JSON.stringify({
            type: "GET_COURIERS_SUCCESS",
            couriers,
          })
        );
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const createPublishNotification = async (parsed) => {
  try {
    const recipients = await User.find({role: parsed.recipientsGroup}).distinct('_id');
    parsed.data.recipients = recipients
    parsed.data.wasNotReadBy = recipients
    const notification = await Notification(parsed.data)
    await notification.save();
    console.log(notification)
    Object.keys(connections).forEach((id) => {
      let connection;
      connection = connections[id];
      return connection.ws.send(
        JSON.stringify({
          type: "NEW_NOTIFICATION",
        })
      );
    });
  } catch (error) {
    console.log(error);
  }
};

const createRejectNotification = async (parsed) => {
  try {
    const recipients = await User.find({role: parsed.recipientsGroup}).distinct('_id');
    parsed.data.recipients = recipients
    parsed.data.wasNotReadBy = recipients
    const notification = await Notification(parsed.data)
    await notification.save();
    Object.keys(connections).forEach((id) => {
      let connection;
      if (recipients.toString().includes(connections[id].user._id) || parsed.data.user === connections[id].user._id.toString()) {
        connection = connections[id];
        return connection.ws.send(
          JSON.stringify({
            type: "NEW_NOTIFICATION",
          })
        );
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const transferToCourierNotification = async (parsed) => {
  try {
    const notification = await Notification(parsed.data);
    await notification.save();
    Object.keys(connections).forEach((id) => {
      let connection;
      if (parsed.data.recipients.toString().includes(connections[id].user._id.toString()) || parsed.recipientsGroup.includes(connections[id].user.role)) {
        connection = connections[id];
        return connection.ws.send(
          JSON.stringify({
            type: "NEW_NOTIFICATION",
          })
        );
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const orderCrudActions = async (parsed) => {
  try {
    Object.keys(connections).forEach((id) => {
      let connection;
      if (parsed.recipientsGroup.includes(connections[id].user.role)) {
        connection = connections[id];
        return connection.ws.send(
          JSON.stringify({
           type: "ORDER_ACTION",
          })
        );
      }
    });
  } catch (error) {
    console.log(error);
  }
};


router.ws("/", wsAuth, function (ws, req) {
  const user = ws.user;
  connections[user._id] = { user, ws };
  console.log("total clients connected: " + Object.keys(connections).length);

  ws.on("message", async (msg) => {
    const parsed = JSON.parse(msg);
    switch (parsed.type) {
      case "REFRESH_GEODATA":
        refreshData(user._id, parsed);
        break;
      case "REJECT_ORDER_NOTIFICATION":
        createRejectNotification(parsed);
        break;
      case "PUBLISH_ORDER_NOTIFICATION":
        createPublishNotification(parsed);
        break;
      case "TRANSFER_TO_COURIER_NOTIFICATION":
        transferToCourierNotification(parsed);
        break;
      case "ORDER_CRUD_ACTION":
        orderCrudActions(parsed);
        break;
      default:
        console.log("NO TYPE: " + parsed.type);
    }
  });

  ws.on("close", async (msg) => {
    console.log("close", user.username);
    delete connections[user._id];
    await refreshData(user._id);
  });
});

module.exports = router;
