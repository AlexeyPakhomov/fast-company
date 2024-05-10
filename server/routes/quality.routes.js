const express = require('express');
const Quality = require('../models/Quality');
const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
  try {
    const qualities = await Quality.find();
    res.status(200).json(qualities);
  } catch (e) {
    res.status(500).json({
      message: 'Произошла ошибка на сервере. Данные качеств не получены. Попробуйте позже.',
    });
  }
});

module.exports = router;
