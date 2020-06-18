const express = require('express');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');
const Courier = require('../models/Courier');
const router = express.Router();

router.put('/', [auth, permit('courier', 'admin', 'super_admin')], async (req, res) => {
  try {
    const courier = await Courier.findById(req.user.courier);
    courier.geoData = req.body.geoData;
    if(req.body.geoData) {
      courier.geoData.datetime = new Date;
    }
    courier.save()
    return res.send(courier._id);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

module.exports = router;