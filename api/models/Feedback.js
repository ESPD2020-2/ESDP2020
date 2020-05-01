const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
  client: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  feedbackText: {
    type: String,
    required: true,
  },
  postedAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

const Feedback = mongoose.model('Feedback', FeedbackSchema);

module.exports = Feedback;