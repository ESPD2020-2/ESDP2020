const express = require('express');
const ValidationError = require('mongoose').Error.ValidationError;

const Review = require('../models/Review');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');

const router = express.Router();

router.get('/', async (req, res) => {
  const reviews = await Review.find().populate('customer', 'name surname patronymic');
  return res.send(reviews);
});

router.get('/:id', [auth, permit('admin','super_admin')], async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).populate('customer', 'name surname patronymic');

    if (!review) {
      return res.status(404).send({message: "Отзыв не найден"});
    }

    return res.send(review);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post('/', [auth, permit('user')], async (req, res) => {
  try {
    const reviewData = {
      user: req.user._id,
      customer: req.body.customerId,
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