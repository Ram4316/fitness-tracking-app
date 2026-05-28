const express = require('express');

const achievements = require('./achievements');
const devices = require('./devices');
const friends = require('./friends');
const goals = require('./goals');
const leaderboard = require('./leaderboard');
const nutrition = require('./nutrition');
const plans = require('./plans');
const progress = require('./progress');
const workouts = require('./workouts');

const router = express.Router();

router.use('/workouts', workouts);
router.use('/nutrition', nutrition);
router.use('/goals', goals);
router.use('/progress', progress);
router.use('/plans', plans);
router.use('/achievements', achievements);
router.use('/devices', devices);
router.use('/friends', friends);
router.use('/leaderboard', leaderboard);

module.exports = router;
