const { check, validationResult } = require('express-validator');

function validationFields(data) {
  check('email', 'Указан некорректный email').isEmail(),
    check('password', 'Длина пароля должна быть не менее 8  символов').isLength({ min: 8 });

  const error = validationResult(data);
  console.log('err', error);
  return error;
}

module.exports = { validationFields };
