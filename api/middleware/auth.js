const User = require('../models/User');

const auth = async (req, res, next) => {
  const authorizationHeader = req.get('Authorization');

  if (!authorizationHeader) {
    return res.status(401).send({error: 'No authorization header'});
  }

  const [type, token] = authorizationHeader.split(' ');

  if (type !== 'Token' || !token) {
    return res.status(401).send({error: "Authorization type wrong or token not present"});
  }

  const user = await User.findOne({token});

  if (!user) {
    return res.status(401).send({error: 'No user found with this token. Token incorrect'});
  }

  req.user = user;

  next();
};

module.exports = auth;