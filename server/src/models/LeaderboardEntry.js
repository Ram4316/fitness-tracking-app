const mongoose = require('mongoose');

const LeaderboardEntrySchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    scope: { type: String, enum: ['global', 'friends'], default: 'global' },
    period: { type: String, enum: ['daily', 'weekly', 'monthly', 'all_time'], default: 'weekly' },
    metric: { type: String, default: 'points' },
    score: { type: Number, default: 0 },
  },
  { timestamps: true },
);

LeaderboardEntrySchema.index({ userId: 1, scope: 1, period: 1 }, { unique: true });

module.exports = mongoose.model('LeaderboardEntry', LeaderboardEntrySchema);
