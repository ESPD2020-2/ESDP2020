const express = require('express');
const ValidationError = require('mongoose').Error.ValidationError;

const Review = require('../models/Review');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');

const router = express.Router();

router.get('/', async (req, res) => {
  const reviews = await Review.find();
  return res.send(reviews);
});

router.get('/:id', async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).send({message: "Отзыв не найден"});
    }

    return res.send(review);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get('/:author', auth, async (req, res) => {
  const authorReviews = await Review.find({author: req.user._id});

  if (!authorReviews) {
    return res.status(404).send({message: "Нет такого автора отзыва!"});
  } else {
    return res.status(200).send(authorReviews);
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const reviewData = {
      author: req.body.customerId,
      comment: req.body.comment,
      rating: req.body.rating,
    };

    if (req.body.advantages) {
      reviewData.advantages = req.body.advantages;
    }

    if (req.body.disadvantages) {
      reviewData.disadvantages = req.body.disadvantages;
    }

    const review = new Review(reviewData);

    await review.save();
    return res.send(review);
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).send(error);
    } else {
      return res.sendStatus(500);
    }
  }
});

router.delete('/:id', [auth, permit('super_admin')], async (req, res) => {
  try {
    await Review.findOneAndDelete({_id: req.params.id});
    return res.send({message: `Отзыв ${req.params.id} удален`});
  } catch (error) {
    return res.status(400).send({message: "Не удалось удалить отзыв"});
  }
});

module.exports = router;