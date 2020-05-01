const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CourierSchema = new Schema({
  courier: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  courierID: {
    type: String,
    required: true,
  },
  activeOrder: {
    type: Schema.Types.ObjectId,
    ref: 'Order',
    default: null,
  },
});

const Courier = mongoose.model('Courier', CourierSchema);

module.exports = Courier;