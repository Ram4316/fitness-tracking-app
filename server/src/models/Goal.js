const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    type: { type: String, default: 'general' },
    targetValue: Number,
    currentValue: Number,
    unit: String,
    startDate: { type: Date, default: Date.now },
    endDate: Date,
    status: { type: String, default: 'active' },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Goal', GoalSchema);
