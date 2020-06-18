const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CourierSchema = new Schema(
  {
    // user: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true
    // },
    // courierID: {
    //   type: Date,
    //   defaul: Date.now(),
    //   required: true,
    // },
    // activeOrder: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Order",
    //   default: null,
    // },
    displayName: {
      type: String,
      validate: {
        validator: function (value) {
          if (value.length === 0) throw new Error('Heобходимо заполнить');
        }
      }
    },
    phone: {
      type: String,
      validate: {
        validator: function(value) {
          const phoneRegex = /\d{4} \d{2}-\d{2}-\d{2}/;
          return phoneRegex.test(value);
          
        },
        message: () => 'Вы ввели неверный формат номера телефона'
      },
      required: [true, 'Heобходимо заполнить']
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      validate: { 
        validator: function(value) {
          const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
          return emailRegex.test(value);
        },
        message: () => 'Вы ввели неверный формат электронной почты'
      },
      required: [true, 'Heобходимо заполнить']
    },
    geoData: {
      type: mongoose.Schema.Types.Mixed,
      default: null
    },
  },
  {
    versionKey: false,
  }
);

const Courier = mongoose.model("Courier", CourierSchema);

module.exports = Courier;
