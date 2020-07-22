const express = require("express");

const auth = require("../middleware/auth");
const permit = require("../middleware/permit");

const Customer = require("../models/Customer");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const findCustomer = await Customer.findOne({ phone: req.body.phone });
    if (!findCustomer) {
      const customer = new Customer(req.body);
      await customer.save();
      return res.send(customer._id);
    } else if (findCustomer && !findCustomer.addedToBlackList) {
      return res.send(findCustomer._id);
    } else {
      res
        .status(400)
        .send({
          error: "Не удалось создать заказ, обратитесь в службу поддержки",
        });
    }
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.patch(
  "/:id",
  [auth, permit("operator", "admin", "super_admin")],
  async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    console.log(req.body.addedToBlackList)
    let response;
    try {
      if (!customer) {
        return res.status(404).send({ error: "Not found" });
      } else {
        response = customer._id;
      }
      if (req.body.name) {
        customer.name = req.body.name;
      }
      if (req.body.surname) {
        customer.surname = req.body.surname;
      }
      if (req.body.patronymic) {
        customer.patronymic = req.body.patronymic;
      }
      if (req.body.phone) {
        customer.phone = req.body.phone;
      }
      if (req.body.email) {
        customer.email = req.body.email;
      }
      if (req.body.addedToWhiteList) {
        customer.name = req.body.addedToWhiteList;

        response = { message: 'Клиент успешно добавлен в "Белый список"' };
      }
      if (req.body.addedToBlackList) {
        if (req.body.addedToBlackList.reason === '') {
          return res.status(400).send({error: "Необходимо указать причину, попробуйте еще раз"});
        }
        const date = new Date;
        customer.addedToBlackList = true;
        customer.blacklistingReason = req.body.addedToBlackList;
        customer.historicalData.push({
          user: req.body.addedToBlackList.author,
          reason: req.body.addedToBlackList.reason,
          date,
        })
        response = { message: 'Клиент успешно добавлен в "Черный список"' };
      }
      await customer.save();
      return res.send(response);
    } catch (e) {
      return res.status(500).send(e);
    }
  }
);

module.exports = router;
