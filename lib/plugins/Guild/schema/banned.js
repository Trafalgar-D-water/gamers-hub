// bannedUser.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const BannedUserSchema = new Schema({
  userId: { type: String, required: true }, // User ObjectId as string
  username: { type: String, required: true },
  discriminator: { type: String, required: true },
  reason: { type: String },
  bannedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('BannedUser', BannedUserSchema, 'BannedUsers');
