const mongoose = require('mongoose');
const config = require('./config');
const User = require('./models/User');
const Customer = require('./models/Customer');
const City = require('./models/City');
const Category = require('./models/Category');
const Street = require('./models/Street');
const streets = require('./constant');
const {nanoid} = require("nanoid");
const Courier = require('./models/Courier');

const run = async () => {
  await mongoose.connect(config.database, config.databaseOptions);

  const collections = await mongoose.connection.db.listCollections().toArray();

  for (let coll of collections) {
    await mongoose.connection.db.dropCollection(coll.name);
  }

  const [courier, courier2] = await Courier.create({
    displayName: 'Vasya',
    phone: '0555 11-11-11',
    email: 'Vasya@skynet.com',
  }, {
    displayName: 'Petya',
    phone: '0555 29-29-29',
    email: 'Petya@skynet.com'
  })

  const [user1, user2, user3] = await Customer.create({
    name: 'John',
    surname: 'Connor',
    patronymic: 'Sarovich',
    phone: '0555 89-89-89',
    email: 'j.connor@skynet.com'
  }, {
    name: 'Sarrah',
    surname: 'Connor',
    patronymic: 'Kyleovna',
    phone: '0555 65-65-65',
    email: 's.connor@skynet.com'
  }, {
    name: 'Петр',
    surname: 'Иванов',
    patronymic: 'Сергеевич',
    phone: '0555 45-45-45',
    email: 'p.ivanov@test.com',
    addedToBlackList: true
  });

 await User.create({
    username: 'operator',
    password: '123',
    token: nanoid(),
    role: 'operator'
  }, {
    username: 'admin',
    password: '123',
    role: 'admin',
    token: nanoid(),
  }, {
    username: 'courier',
    password: '123',
    role: 'courier',
    token: nanoid(),
    courier: courier
  }, {
    username: 'courier2',
    password: '123',
    role: 'courier',
    token: nanoid(),
    courier: courier2
  }, {
    username: 'petr',
    password: '123',
    customer: user3,
    token: nanoid(),
  }, {
    username: 'sarah',
    password: '123',
    customer: user2,
    token: nanoid(),
  }, {
    username: 'john',
    password: '123',
    customer: user1,
    token: nanoid(),
  });

  const city = await City.create({
    name: 'Бишкек'
  });
  const st = streets.map(el => ({...el, city}))
  await Street.create(
    [...st]
  );
  mongoose.connection.close();
};

run().catch(e => {
  mongoose.connection.close();
  throw e;
});
