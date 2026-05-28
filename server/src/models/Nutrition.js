const mongoose = require('mongoose');

const MealSchema = new mongoose.Schema(
  {
    name: String,
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
  },
  { _id: false },
);

const NutritionSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    date: { type: Date, default: Date.now, index: true },
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
    meals: [MealSchema],
  },
  { timestamps: true },
);

module.exports = mongoose.model('Nutrition', NutritionSchema);
