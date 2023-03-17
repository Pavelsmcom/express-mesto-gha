const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../utils/errors/unauthorized-error');
const { SOME_SECRET_KEY } = require('../utils/constants');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, SOME_SECRET_KEY);
  } catch (err) {
    next(new UnauthorizedError('Required authorization'));
    return;
  }
  req.user = payload;
  next();
};
