const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    reviewNumber: {
      type: Number,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    advantages: {
      type: String,
    },
    disadvantages: {
      type: String,
    },
    comment: {
      type: String,
      required: true,
    },
    postedAt: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    rating: {
      type: [mongoose.Schema.Types.Mixed],
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;
