const express = require('express');

const Nutrition = require('../models/Nutrition');
const { requireUserId } = require('./helpers');
const { asyncHandler } = require('../utils/asyncHandler');

const router = express.Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const userId = requireUserId(req);
    const items = await Nutrition.find({ userId }).sort({ date: -1 });
    res.json({ items });
  }),
);

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const userId = requireUserId(req);
    const item = await Nutrition.create({ ...req.body, userId });
    res.status(201).json({ item });
  }),
);

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const userId = requireUserId(req);
    const item = await Nutrition.findOne({ _id: req.params.id, userId });
    if (!item) {
      res.status(404).json({ error: 'Nutrition entry not found' });
      return;
    }
    res.json({ item });
  }),
);

router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const userId = requireUserId(req);
    const item = await Nutrition.findOneAndUpdate(
      { _id: req.params.id, userId },
      req.body,
      { new: true },
    );
    if (!item) {
      res.status(404).json({ error: 'Nutrition entry not found' });
      return;
    }
    res.json({ item });
  }),
);

router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const userId = requireUserId(req);
    const item = await Nutrition.findOneAndDelete({ _id: req.params.id, userId });
    if (!item) {
      res.status(404).json({ error: 'Nutrition entry not found' });
      return;
    }
    res.json({ item });
  }),
);

module.exports = router;
