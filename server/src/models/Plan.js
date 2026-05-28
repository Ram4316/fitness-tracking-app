const mongoose = require('mongoose');

const PlanWorkoutSchema = new mongoose.Schema(
  {
    day: String,
    focus: String,
    durationMinutes: Number,
  },
  { _id: false },
);

const PlanSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    name: { type: String, required: true },
    description: String,
    active: { type: Boolean, default: true },
    workouts: [PlanWorkoutSchema],
  },
  { timestamps: true },
);

module.exports = mongoose.model('Plan', PlanSchema);
