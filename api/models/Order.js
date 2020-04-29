const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  orderNumber: {
    type: String,
    required: true,
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  courier: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  deliveryAddress: {
    type: [String],
    required: true,
  },
  pickupAddress: {
    type: [String],
    required: true,
  },
  pickupEntityName: { //имя человека или название организации, у которых нужно забрать доставку
    type: String,
  },
  phoneNumber: { //показывать только для неавторизованного пользователя
    type: String,
    validate: {
      validator: function(v) {
        return /\+996\(\d{3}\)\d{2}-\d{2}-\d{2}/.text(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: true,
  },
  paymentAmount: {
    type: String,
    required: true,
    default: null,
  },
  pickupTime: {
    type: Date,
    default: null,
  },
  deliveryTime: {
    type: Date,
    default: null,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  status: {
    type: String,
    enum: ['notDistributed', 'distributed', 'acceptedForExecution'],
    default: 'notDistributed',
  },
  isDelivered: {
    type: Boolean,
    default: false,
  }
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;