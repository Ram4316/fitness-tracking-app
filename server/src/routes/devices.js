const express = require('express');

const Device = require('../models/Device');
const { requireUserId } = require('./helpers');
const { asyncHandler } = require('../utils/asyncHandler');

const router = express.Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const userId = requireUserId(req);
    const items = await Device.find({ userId }).sort({ createdAt: -1 });
    res.json({ items });
  }),
);

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const userId = requireUserId(req);
    const item = await Device.create({ ...req.body, userId });
    res.status(201).json({ item });
  }),
);

router.post(
  '/:id/sync',
  asyncHandler(async (req, res) => {
    const userId = requireUserId(req);
    const item = await Device.findOneAndUpdate(
      { _id: req.params.id, userId },
      { lastSyncedAt: new Date(), status: 'synced' },
      { new: true },
    );
    if (!item) {
      res.status(404).json({ error: 'Device not found' });
      return;
    }
    res.json({ item });
  }),
);

module.exports = router;
