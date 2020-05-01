const express = require('express');
const bcrypt = require('bcrypt');

const auth = require('../middleware/auth');
const permit = require('../middleware/permit');

const User = require('../models/User');

const router = express.Router();

router.post('/', async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  try {
    user.generateToken();
    await user.save();
    return res.send(user);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.post('/sessions', async (req, res) => {
  const user = await User.findOne({username: req.body.username});

  if (!user) {
    return res.status(400).send({error: 'Username or password not correct!'});
  }

  const isMatch = await bcrypt.compare(req.body.password, user.password);

  if (!isMatch) {
    return res.status(400).send({error: 'Username or password not correct!'});
  }

  user.generateToken();

  await user.save();

  return res.send(user);
});

router.patch('/profile', auth, async (req, res) => {
  try {
    if (req.body.password) {
      req.user.password = req.body.password;
    }

    if (req.body.displayName) {
      req.user.displayName = req.body.displayName;
    }

    if (req.body.phone) {
      req.user.phone = req.body.phone;
    }

    if (req.body.email) {
      req.user.email = req.body.email;
    }

    await req.user.save();

    return res.send(req.user);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
});

router.patch('/:id', [auth, permit('operator', 'admin', 'super_admin')], async (req, res) =>{
  try {
    if (req.body.addedToWhiteList !== null) {
      req.user.addedToWhiteList = req.body.addedToWhiteList;
    }

    if (req.body.addedToBlackList !== null) {
      req.user.addedToBlackList = req.body.addedToBlackList;
    }

    await req.user.save();

    return res.send(req.user);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
});

router.delete('/sessions', async (req, res) => {
  const success = {message: 'Success'};

  try {
    const token = req.get('Authorization').split(' ')[1];

    if (!token) return res.send(success);

    const user = await User.findOne({token});

    if (!user) return res.send(success);

    user.generateToken();
    await user.save();

    return res.send(success);
  } catch (error) {
    return res.send(success);
  }
});

module.exports = router;