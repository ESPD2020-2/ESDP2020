const mongoose = require("mongoose");
const { nanoid } = require("nanoid");

const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      default: () => nanoid(8),
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
      default: Date.now(),
    },
    acceptedAt: {
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
      type: String,
      required: [function () {
        return this.status === 'rejected' || this.status === 'canceled'
      }, "Необходимо написать причину отказа, попробуйте еще раз"]
    },
    courierComment: {
      type: String,
    },
    status: {
      type: String,
      enum: [
        "created", //создание
        "published",
        "transferred", //передача курьеру
        "accepted", //принятием курьером
        "rejected", //отказ от выполнения заказа курьером после принятия этого заказа
        "canceled", //отказ от выполнения заказа клиентом после принятия этого заказа
        "delivered", //доставлено курьером
      ],
      default: "created",
    },

    // pickupEntityName: {
    //   //имя человека или название организации, у которых нужно забрать доставку
    //   type: String,
    // },
    // pickupEntityPhone: {
    //   type: String,
    //   validate: {
    //     validator: function (v) {
    //       return /\+996\(\d{3}\)\d{2}-\d{2}-\d{2}/.text(v);
    //     },
    //     message: (props) => `${props.value} is not a valid phone number!`,
    //   },
    //   required: true,
    // },
   
    // deliveryEntityName: {
    //   //имя человека или название организации, которому осуществляется доставка
    //   type: String,
    // },
    
    // deliveryEntityPhone: {
    //   type: String,
    //   validate: {
    //     validator: function (v) {
    //       return /\+996\(\d{3}\)\d{2}-\d{2}-\d{2}/.text(v);
    //     },
    //     message: (props) => `${props.value} is not a valid phone number!`,
    //   },
    //   required: true,
    // },
   
    // additionalInfo: {
    //   type: String,
    //   default: null,
    // },
  },
  {
    versionKey: false,
  }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
