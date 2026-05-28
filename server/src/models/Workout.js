const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema(
  {
    name: String,
    sets: Number,
    reps: Number,
    weight: Number,
    durationMinutes: Number,
    distanceKm: Number,
  },
  { _id: false },
);

const WorkoutSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    name: String,
    type: { type: String, default: 'general' },
    date: { type: Date, default: Date.now, index: true },
    durationMinutes: Number,
    caloriesBurned: Number,
    exercises: [ExerciseSchema],
    notes: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model('Workout', WorkoutSchema);
