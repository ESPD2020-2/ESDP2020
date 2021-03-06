const ValidationError = require("mongoose").Error.ValidationError;

const express = require("express");
const bcrypt = require("bcrypt");

const auth = require("../middleware/auth");
const permit = require("../middleware/permit");

const User = require("../models/User");
const Customer = require("../models/Customer");

const router = express.Router();

router.get("/", [auth, permit("admin", "super_admin")], async (req, res) => {
  try {
    const users = await User.find(
      { role: { $ne: "user" } },
      "_id username role displayName"
    );
    return res.send(users);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get(
  "/couriers",
  [auth, permit("courier", "operator", "admin", "super_admin")],
  async (req, res) => {
    try {
      const couriers = await User.find(
        { role: "courier" },
        { username: 1, geoData: 1, displayName: 1, status: 1 }
      );
      res.send(couriers);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
);

router.post("/", async (req, res) => {
  try {
    let customer;

    const userData = {
      username: req.body.username,
      password: req.body.password,
    };

    const customerData = {
      name: req.body.name,
      surname: req.body.surname,
      patronymic: req.body.patronymic,
      phone: req.body.phone,
      email: req.body.email,
    };

    if (req.body.role) {
      userData.role = req.body.role;
    };
    if (req.body.displayName) {
      userData.displayName = req.body.displayName;
    };
    if (!req.body.role) {
      customer = new Customer(customerData);
      userData.customer = customer._id;
    };
    const user = new User(userData);
    user.generateToken();
    await user.validate();
   
    if (!req.body.role) {
      await customer.save();
    };

    await user.save();
    return res.send(user);
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).send(error);
    } else {
      return res.sendStatus(500);
    }
  }
});

router.post("/sessions", async (req, res) => {
  const user = await User.findOne({ username: req.body.username }).populate(
    "customer courier"
  );

  if (!user) {
    return res.status(400).send({ error: "Username or password not correct!" });
  }

  const isMatch = await bcrypt.compare(req.body.password, user.password);

  if (!isMatch) {
    return res.status(400).send({ error: "Username or password not correct!" });
  }

  user.generateToken();

  await user.save();

  return res.send(user);
});

router.delete("/sessions", async (req, res) => {
  const success = { message: "Success" };

  try {
    const token = req.get("Authorization").split(" ")[1];

    if (!token) return res.send(success);

    const user = await User.findOne({ token });

    if (!user) return res.send(success);

    user.generateToken();
    await user.save();

    return res.send(success);
  } catch (error) {
    return res.send(success);
  }
});

router.patch(
  "/:id",
  [auth, permit("admin", "super_admin")],
  async (req, res) => {
    const user = await User.findById(req.params.id);
    try {
      if (!user) {
        return res.status(404).send({ error: "Not found" });
      }
      if (req.body.password) {
        user.password = req.body.password;
      }
      if (req.body.role) {
        user.role = req.body.role;
      }
      if(req.body.displayName) {
        user.displayName = req.body.displayName;
      }
      user.username = req.body.username;
      await user.save();
      return res.send({ message: "edited" });
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(400).send(error);
      } else {
        return res.sendStatus(500);
      }
    }
  }
);

router.delete(
  "/:id",
  [auth, permit("admin", "super_admin")],
  async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).send({ error: "Not found" });
      }
      return res.send({ message: "deleted" });
    } catch (e) {
      return res.status(500).send(e);
    }
  }
);

module.exports = router;