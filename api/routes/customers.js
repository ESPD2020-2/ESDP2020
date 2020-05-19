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
      console.log(customer, 'yes')
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


router.patch('/:id', async (req, res) => {

  const customer = await Customer.findById(req.params.id)
  try {
    if (!customer) {
      return res.status(404).send({message: 'Not found'});
    };

    customer.name = req.body.name;
    customer.surname = req.body.surname;
    customer.patronymic = req.body.patronymic;
    customer.phone = req.body.phone;
    customer.email = req.body.email;

    await customer.save();
    return res.send(customer._id);
  } catch (e) {
    return res.status(500).send(e);
  }
});


module.exports = router;