const express = require('express');
const router = express.Router({ mergeParams: true });
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const tokenService = require('../services/token.service');
const { generateUserData } = require('../utils/helpers');

router.post('/signUp', [
  check('email', 'Указан некорректный email').isEmail(),
  check('password', 'Длина пароля должна быть не менее 8  символов').isLength({ min: 8 }),
  async (req, res) => {
    //console.log(req.body);
    try {
      const error = validationResult(req);

      if (!error.isEmpty()) {
        return res.status(400).json({
          error: {
            message: 'INVALID_DATA',
            code: 400,
            error: error,
          },
        });
      }

      const { email, password } = req.body;
      const existingUser = await User.findOne({ email });
      //console.log('existingUser', existingUser);
      if (existingUser) {
        return res.status(400).json({
          error: {
            message: 'EMAIL_EXISTS',
            code: 400,
          },
        });
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      //console.log('hashedPassword', hashedPassword);
      const newUser = await User.create({
        ...generateUserData(),
        ...req.body,
        password: hashedPassword,
      });
      //console.log('newUser', newUser);
      const tokens = tokenService.generateToken({ _id: newUser._id });
      //console.log('tokens', tokens);
      await tokenService.saveToken(newUser._id, tokens.refreshToken);
      res.status(201).send({ ...tokens, userId: newUser._id });
    } catch (e) {
      res.status(500).json({
        message: 'Произошла ошибка на сервере. Новый пользователь не создан. Попробуйте позже.',
      });
    }
  },
]);

router.post('/signInWithPassword', [
  check('email', 'Указан некорректный email').isEmail(),
  check('password', 'Пароль не может быть пустым').exists(),
  async (req, res) => {
    try {
      //console.log('signInWithPassword');
      const error = validationResult(req);

      if (!error.isEmpty()) {
        return res.status(400).json({
          error: {
            messagge: 'INVALID_DATA',
            code: 400,
            error: error.errors,
          },
        });
      }

      const { email, password } = req.body;
      const existingUser = await User.findOne({ email });

      if (!existingUser) {
        return res.status(400).json({
          error: {
            message: 'EMAIL_NOT_FOUND',
            code: 400,
          },
        });
      }
      const comparePassword = await bcrypt.compare(password, existingUser.password);

      if (!comparePassword) {
        res.status(400).json({
          error: {
            message: 'INVALID_PASSWORD',
            code: 400,
          },
        });
      }

      const tokens = tokenService.generateToken({ _id: existingUser._id });
      await tokenService.saveToken(existingUser._id, tokens.refreshToken);

      res.status(200).send({ ...tokens, userId: existingUser._id });
    } catch (e) {
      res.status(500).json({
        message: 'Произошла ошибка на сервере. Вход запрещен. Попробуйте позже.',
      });
    }
  },
]);
router.post('/token', async (req, res) => {
  try {
    //console.log('REQ.body', req.body);
    const { refresh_token: refreshToken } = req.body;
    const data = tokenService.validateRefresh(refreshToken);
    //console.log('DATA VALIDATE', data);
    const dbToken = await tokenService.findToken(refreshToken);
    //console.log('FIND DB TOKEN', dbToken);

    if (!data || !dbToken || data._id !== dbToken?.user?.toString()) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    //console.log('ALL OK');

    const tokens = await tokenService.generateToken({ _id: data._id });
    await tokenService.saveToken(data._id, tokens.refreshToken);
    //console.log('FINAL', { ...tokens, userId: data._id });
    res.status(200).send({ ...tokens, userId: data._id });
  } catch (e) {
    res.status(500).json({
      message: 'Произошла ошибка на сервере. Ошибка проверки токена. Попробуйте позже.',
    });
  }
});

module.exports = router;
