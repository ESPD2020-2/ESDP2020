const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const CustomerSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Heобходимо заполнить']
    },
    surname: {
      type: String,
      required: [true, 'Heобходимо заполнить']
    },
    patronymic: {
      type: String,
      required: [true, 'Heобходимо заполнить']
    },
    phone: {
      type: String,
      unique: true,
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
    addedToWhiteList: { 
      type: Boolean,
      default: false,
    },
    addedToBlackList: {
      type: Boolean,
      default: false,
    },
    blacklistingReason: mongoose.Schema.Types.Mixed,
    historicalData: {
      type: [mongoose.Schema.Types.Mixed],
    },
  },
  {
    versionKey: false,
  }
);

CustomerSchema.plugin(uniqueValidator, {
  type: 'email',
  message: 'Введенный e-mail уже существует'
});
CustomerSchema.plugin(uniqueValidator, {
  type: 'phone',
  message: `Введенный номер телефона уже существует`
});

const Customer = mongoose.model("Customer", CustomerSchema);

module.exports = Customer;