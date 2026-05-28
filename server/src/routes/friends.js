const express = require('express');

const Friendship = require('../models/Friendship');
const { requireUserId } = require('./helpers');
const { asyncHandler } = require('../utils/asyncHandler');

const router = express.Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const userId = requireUserId(req);
    const items = await Friendship.find({ userId }).sort({ createdAt: -1 });
    res.json({ items });
  }),
);

router.post(
  '/requests',
  asyncHandler(async (req, res) => {
    const userId = requireUserId(req);
    const { friendUserId } = req.body;
    if (!friendUserId) {
      res.status(400).json({ error: 'friendUserId required' });
      return;
    }
    const item = await Friendship.findOneAndUpdate(
      { userId, friendUserId },
      { userId, friendUserId, status: 'pending' },
      { upsert: true, new: true },
    );
    res.status(201).json({ item });
  }),
);

router.post(
  '/:id/accept',
  asyncHandler(async (req, res) => {
    const userId = requireUserId(req);
    const item = await Friendship.findOneAndUpdate(
      { _id: req.params.id, userId },
      { status: 'accepted' },
      { new: true },
    );
    if (!item) {
      res.status(404).json({ error: 'Friend request not found' });
      return;
    }
    res.json({ item });
  }),
);

router.post(
  '/:id/block',
  asyncHandler(async (req, res) => {
    const userId = requireUserId(req);
    const item = await Friendship.findOneAndUpdate(
      { _id: req.params.id, userId },
      { status: 'blocked' },
      { new: true },
    );
    if (!item) {
      res.status(404).json({ error: 'Friend request not found' });
      return;
    }
    res.json({ item });
  }),
);

module.exports = router;
