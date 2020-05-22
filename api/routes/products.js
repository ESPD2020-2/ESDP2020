const express = require('express');
const ValidationError = require('mongoose').Error.ValidationError;

const upload = require('../multer').uploads;

const Product = require('../models/Product');

const router = express.Router();

router.get('/', async (req, res) => {
  let dbQuery = {};

  if (req.query.category) {
    dbQuery.category = req.query.category;
  }

  const items = await Product.find(dbQuery).populate('category');
  res.send(items);
});

router.get('/:id', async (req, res) => {
  try {
    const item = await Product.findById(req.params.id);

    if (!item) {
      return res.status(404).send({message: 'Not found'});
    }

    res.send(item);
  } catch (e) {
    res.status(404).send({message: 'Not found'});
  }
});

router.post('/', [upload.single('image')], async (req, res) => {
  try {
    const productData = {
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
    };

    if (req.file) {
      productData.image = req.file.filename;
    }

    const product = new Product(productData);

    await product.save();

    return res.send({id: product._id});
  } catch (e) {
    if (e instanceof ValidationError) {
      return res.status(400).send(e);
    } else {
      return res.sendStatus(500);
    }
  }
});

module.exports = router;
