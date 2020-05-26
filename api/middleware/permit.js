const permit = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).send({error: 'Вы не авторизованы'});
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).send({error: 'У вас нет прав для этой операции'})
    }

    next();
  }
};

module.exports = permit;