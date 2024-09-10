const mongoose = require("mongoose");
const { Schema } = mongoose;

const proflieSchema = new Schema({
  userId :{type : String , required : true },
  username: { type: String, unique: true },
  avatar: { type: String , required : false},
  bio: { type: String , required: false },
  role: {
    isPlayer: { type: Boolean, default: true },
    isCoach: { type: Boolean, default: false },
  },
  skills: [{ type: String }],
  gamePreferences: [
    {
      gameName: { type: String },
      preferredRole: { type: String },
      rank: { type: String },
    },
  ],
  rank: { type: String },
  coachProfile: {
    experience: { type: String },
    coachingSpecializations: [{ type: String }],
    rates: { type: Number },
    availability: {
      days: [{ type: String }],
      times: {
        start: { type: String },
        end: { type: String },
      },
    },
  },
  // friends: [
  //   {
  //     username: { type: String, required: true },
  //     discriminator: { type: String, required: true },
  //     avatar: { type: String },
  //     status: {
  //       type: String,
  //       enum: ["offline", "online", "dnd", "idle"],
  //       default: "offline",
  //     },
  //   },
  // ],
  // blockedUsers: [
  //   {
  //     username: { type: String, required: true },
  //     discriminator: { type: String, required: true },
  //   },
  // ],
  preferences: {
    theme: { type: String, enum: ["light", "dark"], default: "dark" },
    notifications: { type: Boolean, default: true },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
} , {timestamps: true});

module.exports = mongoose.model('Profile' , proflieSchema , 'Profiles')