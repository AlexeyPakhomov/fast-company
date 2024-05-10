const tokenService = require('../services/token.service');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    //token = 'Bearer qwdafdsfsdfsdggsfgsdgsdgssd'
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      res.status(401).json({ message: 'Unauthorized' });
    }
    //console.log('token', token);
    const data = tokenService.validateAccess(token);

    //console.log('data', data);

    // Создаем поле user в req
    req.user = data;

    next();
  } catch (e) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
