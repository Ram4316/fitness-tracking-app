const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    date: { type: Date, default: Date.now, index: true },
    weightKg: Number,
    bodyFatPct: Number,
    notes: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model('Progress', ProgressSchema);
