const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    reviewText: {
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
    },
  },
  {
    versionKey: false,
  }
);

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;
