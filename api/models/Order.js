const mongoose = require("mongoose");
const { nanoid } = require("nanoid");

const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      default: () => nanoid(7),
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true
    },
    courier: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    pickupAddress: {
      type: [mongoose.Schema.Types.Mixed],
      required: true,
    },
    deliveryAddress: {
      type: [mongoose.Schema.Types.Mixed],
      required: true,
    },
    paymentAmount: {
      type: String,
      required: true,
      default: null,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    acceptedAt: {
      type: Date,
      default: null,
    },
    canceledAt: {
      type: Date,
      default: null,
    },
    deliveredAt: {
      type: Date,
      default: null,
    },
    historicalData: {
      type: [mongoose.Schema.Types.Mixed],
      required: function () {
        return this.status === 'rejected' || this.status === 'canceled'
      }
    },
    reason: {
      type: mongoose.Schema.Types.Mixed,
      required: function () {
        return this.status === 'rejected' || this.status === 'canceled'
      }
    },
    courierComment: {
      type: String,
    },
    status: {
      type: String,
      enum: [
        "created", 
        "published",
        "transferred",
        "accepted",
        "rejected", 
        "canceled", 
        "delivered", 
      ],
      default: "created",
    },
  },
  {
    versionKey: false,
  }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
