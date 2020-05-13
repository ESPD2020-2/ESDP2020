const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CitySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const City = mongoose.model("City", CitySchema);

module.exports = City;
