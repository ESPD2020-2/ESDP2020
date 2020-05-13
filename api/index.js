const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./config');
const users = require('./routes/users');
const customers = require('./routes/customers');
const orders = require('./routes/orders');
const streets = require('./routes/streets');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

const run = async () => {
  await mongoose.connect(config.database, config.databaseOptions);

  app.use('/users', users);
  app.use('/customers', customers);
  app.use('/streets', streets);
  app.use('/orders', orders);

  app.listen(config.port, () => {
    console.log(`HTTP Server started on ${config.port} port!`);
  });
};

run().catch(error => {
  console.error(error);
});