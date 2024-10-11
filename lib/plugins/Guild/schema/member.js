// member.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const MemberSchema = new Schema({
  userId: { type: String, required: true }, // Store the user ID as a string
  guildId : {type : String , required : true},
  username: { type: String, required: true },
  discriminator: { type: String }, // Unique 4-digit discriminator (e.g., #1234)
  roleIds: [{ type: String }], // Array of role ObjectId strings
  status: {
    type: String,
    enum: ["online", "offline", "idle", "dnd"],
    default: "offline",
  },
  joinedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Member', MemberSchema, 'Members');
