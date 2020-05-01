const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  orderNumber: {
    type: String,
    required: true,
    default: () => nanoid(8),
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
  pickupEntityName: { //имя человека или название организации, у которых нужно забрать доставку
    type: String,
  },
  pickupEntityPhone: {
    type: String,
    validate: {
      validator: function(v) {
        return /\+996\(\d{3}\)\d{2}-\d{2}-\d{2}/.text(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: true,
  },
  pickupAddress: {
    type: [String],
    required: true,
  },
  deliveryEntityName: { //имя человека или название организации, которому осуществляется доставка
    type: String,
  },
  deliveryEntityAddress: {
    type: [String],
    required: true,
  },
  deliveryEntityPhone: {
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
    enum: [
      'created', //создание
      'transferred', //передача курьеру
      'accepted', //принятием курьером
      'rejected', //отказ от выполнения заказа курьером после принятия этого заказа
      'canceled', //отказ от выполнения заказа клиентом после принятия этого заказа
      'delivered', //доставлено курьером
    ],
    default: 'created',
  },
  additionalInfo: {
    type: String,
    default: null,
  },
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;