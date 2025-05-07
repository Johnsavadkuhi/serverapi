const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

router.get('/', async (req, res) => {
  const userId = req.user.id;
  const notifications = await Notification.find({ userId }).sort({ createdAt: -1 }).limit(50);
  res.json({ notifications });
});

// علامت‌گذاری به‌عنوان seen
router.patch('/:id/seen', async (req, res) => {
  const userId = req.user.id;
  const notif = await Notification.findOneAndUpdate(
    { _id: req.params.id, userId },
    { seen: true, seenAt: new Date(), status: 'seen' },
    { new: true }
  );
  if (!notif) return res.status(404).json({ error: 'Not found' });
  res.json({ notif });
});

module.exports = router;
