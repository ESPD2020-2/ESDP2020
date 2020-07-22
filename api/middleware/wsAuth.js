const User = require('../models/User');

const authError = {
  type: 'AUTHENTICATION_ERROR',
};

const auth = async (ws, res, next) => {
  const authorizationHeader = res.query;

  if (!authorizationHeader) {
    authError.error='No authorization header'
    ws.send(JSON.stringify(authError));
    return ws.close()
  }

  const type = Object.keys(authorizationHeader)[0]
  const token = authorizationHeader.Token

  if (type !== 'Token' || !token) {
    authError.error='Authorization type wrong or token not present'
    ws.send(JSON.stringify(authError));
    return ws.close()
  }

  const user = await User.findOne({token});

  if (!user) {
    // authError.error='No user found with this token. Token incorrect'
    ws.send(JSON.stringify(authError));
    return ws.close()
  }

  ws.user = user;

  next();
};

module.exports = auth;
