const express = require('express');

const Achievement = require('../models/Achievement');
const { requireUserId } = require('./helpers');
const { asyncHandler } = require('../utils/asyncHandler');

const router = express.Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const userId = requireUserId(req);
    const items = await Achievement.find({ userId }).sort({ date: -1 });
    res.json({ items });
  }),
);

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const userId = requireUserId(req);
    const item = await Achievement.create({ ...req.body, userId });
    res.status(201).json({ item });
  }),
);

router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const userId = requireUserId(req);
    const item = await Achievement.findOneAndDelete({ _id: req.params.id, userId });
    if (!item) {
      res.status(404).json({ error: 'Achievement not found' });
      return;
    }
    res.json({ item });
  }),
);

module.exports = router;
