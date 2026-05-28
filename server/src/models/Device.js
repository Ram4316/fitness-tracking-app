const mongoose = require('mongoose');

const DeviceSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    provider: { type: String, enum: ['apple_health', 'google_fit'], required: true },
    status: { type: String, default: 'connected' },
    lastSyncedAt: Date,
    metadata: Object,
  },
  { timestamps: true },
);

module.exports = mongoose.model('Device', DeviceSchema);
