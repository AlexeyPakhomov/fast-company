const express = require('express');
const router = express.Router({ mergeParams: true });
const authMiddleware = require('../middleware/auth.middleware');
const Comment = require('../models/Comment');

router.get('/', authMiddleware, async (req, res) => {
  try {
    const { orderBy, equalTo } = req.query;
    const listComment = await Comment.find({ [orderBy]: equalTo });
    res.status(200).send(listComment);
  } catch (e) {
    res.status(500).json({
      message: 'Произошла ошибка на сервере. Комментарии не получены. Попробуйте позже.',
    });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const newComment = await Comment.create({ ...req.body, userId: req.user._id });

    res.status(201).send(newComment);
  } catch (e) {
    res.status(500).json({
      message: 'Произошла ошибка на сервере. Комментарий не размещен. Попробуйте позже.',
    });
  }
});

router.delete('/:commentId', authMiddleware, async (req, res) => {
  try {
    const { commentId } = req.params;
    const removedComment = await Comment.findById(commentId);

    if (removedComment.userId.toString() === req.user._id) {
      //await removedComment.remove();
      await Comment.findByIdAndDelete(commentId);
      res.status(200).send(removedComment);
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  } catch (e) {
    res.status(500).json({
      message: 'Произошла ошибка на сервере. Комментарий не удален. Попробуйте позже.',
    });
  }
});

module.exports = router;
