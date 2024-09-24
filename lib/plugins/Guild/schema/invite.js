// invite.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const InviteSchema = new Schema({
  code: { type: String, required: true },
  createdBy: { type: String, required: true }, // User who created the invite (User ObjectId as string)
  createdAt: { type: Date, default: Date.now },
  uses: { type: Number, default: 0 },
  maxUses: { type: Number, default: 0 }, // 0 = unlimited
});

module.exports = mongoose.model('Invite', InviteSchema, 'Invites');
