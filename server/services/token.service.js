const jwt = require('jsonwebtoken');
const config = require('config');
const Token = require('../models/Token');

class TokenService {
  // return accessToken, refreshToken, exporesIn
  generateToken(payload) {
    const accessToken = jwt.sign(payload, config.get('accessToken'), { expiresIn: '1h' });
    const refreshToken = jwt.sign(payload, config.get('refreshToken'));
    return { accessToken, refreshToken, expiresIn: 3600 };
  }

  async saveToken(userId, refreshToken) {
    // user - это поле user в модели Token
    const data = await Token.findOne({ user: userId });
    //console.log('data', data);
    if (data) {
      data.refreshToken = refreshToken;
      return data.save();
    }
    const token = await Token.create({ user: userId, refreshToken });
    //console.log('token', token);
    return token;
  }

  validateRefresh(refreshToken) {
    try {
      return jwt.verify(refreshToken, config.get('refreshToken'));
    } catch (e) {
      return null;
    }
  }

  validateAccess(accessToken) {
    try {
      return jwt.verify(accessToken, config.get('accessToken'));
    } catch (e) {
      return null;
    }
  }

  async findToken(refreshToken) {
    try {
      console.log('findToken', refreshToken);
      return await Token.findOne({ refreshToken: refreshToken });
    } catch (e) {
      return null;
    }
  }
}

module.exports = new TokenService();
