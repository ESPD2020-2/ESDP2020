const mongoose = require('mongoose');
const config = require('./config');
const User = require('./models/User');
const Customer = require('./models/Customer');
const City = require('./models/City');
const Street = require('./models/Street');
const streets = require('./constant');
const {nanoid} = require("nanoid");

const run = async () => {
  await mongoose.connect(config.database, config.databaseOptions);

  const collections = await mongoose.connection.db.listCollections().toArray();

  for (let coll of collections) {
    await mongoose.connection.db.dropCollection(coll.name);
  }

  const [userCustomer, admCustomer, testCustomer] = await Customer.create({
    name: 'John',
    surname: 'Connor',
    patronymic: 'Sarovich',
    phone: '+996(555)89-89-89',
    email: 'j.connor@skynet.com'
  }, {
    name: 'Sarrah',
    surname: 'Connor',
    patronymic: 'Kyleovna',
    phone: '+996(555)65-65-65',
    email: 's.connor@skynet.com'
  }, {
    name: 'Петр',
    surname: 'Иванов',
    patronymic: 'Сергеевич',
    phone: '+996(555)45-45-45',
    email: 'p.ivanov@test.com',
    addedToBlackList: true
  });

 await User.create({
    username: 'user',
    password: '123',
    token: nanoid(),
    customer: userCustomer,
  }, {
    username: 'admin',
    password: '123',
    role: 'admin',
    token: nanoid(),
    customer: admCustomer,
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