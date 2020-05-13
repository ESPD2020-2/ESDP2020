const express = require('express');

// const auth = require('../middleware/auth');
// const permit = require('../middleware/permit');

const Street = require('../models/Street');

const router = express.Router();

router.get('/', async (req, res) => {
  const searchRegex = new RegExp(req.query.search, 'i');
  let streets;
  if (!req.query.search) {
    streets = await Street.find();
  } else {
    streets = await Street.find({ name: { $regex: searchRegex}}).limit(25)
  }
  res.send(streets);
});



module.exports = router;