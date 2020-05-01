const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {nanoid} = require("nanoid");

const SALT_WORK_FACTOR = 10;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: async function (value) {
        if (!this.isModified('username')) return true;

        const user = await User.findOne({username: value});
        if (user) throw new Error('This user is already registered');
      }
    }
  },
  password: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
  },
  phone: {
    type: String,
    validate: {
      validator: function(v) {
        return /\+996\(\d{3}\)\d{2}-\d{2}-\d{2}/.text(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    validate: { //проверить валидацию
      validator: function(email) {
        const phoneRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
        return phoneRegex.test(email);
      },
    },
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/, 'Please fill a valid email address'],
  },
  addedToWhiteList: { //редактирование доступно только операторам, админам и супер-админу, не отображается у пользователя
    type: Boolean,
    default: null,
  },
  addedToBlackList: { //то же самое
    type: Boolean,
    default: null,
  },
  token: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: 'user',
    enum: ['user', 'courier', 'operator', 'admin', 'super_admin'],
  },
});

UserSchema.methods.generateToken = function() {
  this.token = nanoid();
};

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  const hash = await bcrypt.hash(this.password, salt);

  this.password = hash;
  next();
});

UserSchema.set('toJSON', {
  transform: (doc, ret, options) => {
    delete ret.password;
    return ret;
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;