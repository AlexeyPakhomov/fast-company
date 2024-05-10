const express = require('express');
const Profession = require('../models/Profession');
const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
  try {
    const professions = await Profession.find();
    res.status(200).json(professions);
  } catch (e) {
    res.status(500).json({
      message: 'Произошла ошибка на сервере. Данные ппрофессий не получены. Попробуйте позже.',
    });
  }
});

module.exports = router;
