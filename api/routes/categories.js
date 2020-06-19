const express = require('express');

const auth = require('../middleware/auth');
const permit = require('../middleware/permit');

const Category = require('../models/Category');

const router = express.Router();

router.get('/', async (req, res) => {
  const categories = await Category.aggregate([{
    $lookup: {
      from: 'products',
      localField: '_id',
      foreignField: 'category',
      as: 'products'
    }
  }, {
    $project: {
      "title": 1,
      "description": 2,
      "productCount": {"$size": "$products"}
    }
  }]);

  return res.send(categories);
});

router.post('/', [auth, permit('admin')], async (req, res) => {
  const category = new Category({
    title: req.body.title,
    description: req.body.description
  });

  await category.save();

  return res.send(category);
});

module.exports = router;
