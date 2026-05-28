const mongoose = require('mongoose');

const AchievementSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    title: { type: String, required: true },
    description: String,
    type: { type: String, default: 'milestone' },
    date: { type: Date, default: Date.now },
    metadata: Object,
  },
  { timestamps: true },
);

module.exports = mongoose.model('Achievement', AchievementSchema);
