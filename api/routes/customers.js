const express = require('express');

// const auth = require('../middleware/auth');
// const permit = require('../middleware/permit');

const Customer = require('../models/Customer');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const findCustomer = await Customer.findOne({'phone': req.body.phone});
    if (!findCustomer) {
      const customer = new Customer(req.body);
      await customer.save();
      return res.send(customer._id);
    } else if (findCustomer && !findCustomer.addedToBlackList) {
      return res.send(findCustomer._id);
    } else {
      res.status(400).send('Неудается создать заказ обратитесь в службу поддержки')
    }
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = router;