const mongoose = require('mongoose');

const FriendshipSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    friendUserId: { type: String, required: true },
    status: { type: String, default: 'pending' },
  },
  { timestamps: true },
);

FriendshipSchema.index({ userId: 1, friendUserId: 1 }, { unique: true });

module.exports = mongoose.model('Friendship', FriendshipSchema);
