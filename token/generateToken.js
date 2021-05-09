const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, 'jjklop', {
    expiresIn: '30d',
  })
}

module.exports = generateToken;
