const express = require('express');

const Friendship = require('../models/Friendship');
const LeaderboardEntry = require('../models/LeaderboardEntry');
const { requireUserId } = require('./helpers');
const { asyncHandler } = require('../utils/asyncHandler');

const router = express.Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const userId = requireUserId(req);
    const scope = req.query.scope || 'global';
    const period = req.query.period || 'weekly';

    let userFilter = {};
    if (scope === 'friends') {
      const friends = await Friendship.find({ userId, status: 'accepted' });
      const friendIds = friends.map(friend => friend.friendUserId);
      userFilter = { userId: { $in: [userId, ...friendIds] } };
    }

    const items = await LeaderboardEntry.find({
      scope,
      period,
      ...userFilter,
    })
      .sort({ score: -1 })
      .limit(25);

    res.json({ items });
  }),
);

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const userId = requireUserId(req);
    const { score = 0, period = 'weekly', scope = 'global', metric = 'points' } = req.body || {};

    const item = await LeaderboardEntry.findOneAndUpdate(
      { userId, scope, period, metric },
      { userId, scope, period, metric, score },
      { upsert: true, new: true },
    );

    res.status(201).json({ item });
  }),
);

module.exports = router;
