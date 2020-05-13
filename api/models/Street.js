const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StreetSchema = new Schema(
  {
    city: {
      type: Schema.Types.ObjectId,
      ref: "City",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);
// StreetSchema.index({'name': 'text'});
const Street = mongoose.model("Street", StreetSchema);

module.exports = Street;
