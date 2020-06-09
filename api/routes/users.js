const ValidationError = require('mongoose').Error.ValidationError;

const express = require('express');
const bcrypt = require('bcrypt');

const auth = require('../middleware/auth');
const permit = require('../middleware/permit');

const User = require('../models/User');

const router = express.Router();

router.get('/', [auth, permit('admin', 'super_admin')], async (req, res) => {
  try {
    const users = await User.find({role: {$ne : 'user'}}, '_id username role');
    return res.send(users);
  } catch (error) {
    return res.status(500).send(error);
  }
  
});

router.get('/couriers', [auth, permit('courier', 'operator', 'admin', 'super_admin')], async (req, res) => {
  try {
    const couriers = await User.find({role: 'courier'}, {username: 1});
    res.send(couriers);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.post('/', async (req, res) => {
  const userData = {
    username: req.body.username,
    password: req.body.password,
  }
  if (req.body.role) {
    userData.role = req.body.role;
  }
  if (req.body.customer) {
    userData.customer = req.body.customer;
  }

  const user = new User(userData);

  try {
    user.generateToken();
    await user.save();
    return res.send(user);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.post('/sessions', async (req, res) => {
  const user = await User.findOne({username: req.body.username}).populate('customer');

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

router.patch('/:id', [auth, permit('admin', 'super_admin')], async (req, res) => {
  const user = await User.findById(req.params.id)
  try {
    if (!user) { 
      return res.status(404).send({error: 'Not found'});
    }
    if (req.body.password) {
      user.password = req.body.password;
    }
    if (req.body.role) {
      user.role = req.body.role;
    }
    user.username = req.body.username;
    await user.save();
    return res.send({message: 'edited'});
  } catch (e) {
    if (e instanceof ValidationError) {
      return res.status(400).send(e);
    } else {
      return res.sendStatus(500);
    }
  }
});

router.delete('/:id',[auth, permit('admin', 'super_admin')], async (req, res) => {
  try {
  const user = await User.findByIdAndDelete(req.params.id) 
  if (!user) { 
    return res.status(404).send({error: 'Not found'});
  }
    return res.send({message: 'deleted'});
  } catch (e) {
    return res.status(500).send(e);
  }
});

module.exports = router;