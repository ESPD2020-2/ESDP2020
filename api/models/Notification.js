const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NotificationSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    message: {
      type: String,
      required: true
    },
    wasNotReadBy: {
      type: [String],
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    recipients: {
      type: [String],
    },
  },
  {
    versionKey: false,
  }
);

const Notification = mongoose.model("Notification", NotificationSchema);

module.exports = Notification;