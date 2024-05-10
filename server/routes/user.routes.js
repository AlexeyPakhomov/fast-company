const express = require('express');
const router = express.Router({ mergeParams: true });
const User = require('../models/User');
const authMiddleware = require('../middleware/auth.middleware');

router.patch('/:userId', authMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;

    if (userId === req.user._id) {
      const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });

      res.status(200).send(updatedUser);
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  } catch (e) {
    res.status(500).json({
      message: 'Произошла ошибка на сервере. Данные пользователя не обновлены. Попробуйте позже.',
    });
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    if (req.user) {
      const listUsers = await User.find();
      res.status(200).send(listUsers);
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  } catch (e) {
    res.status(500).json({
      message: 'Произошла ошибка на сервере. Данные пользователей не получены. Попробуйте позже.',
    });
  }
});

module.exports = router;
