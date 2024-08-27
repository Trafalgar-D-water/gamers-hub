"use strict";

const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema(
  {
    username: { type: String, required: true  },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    dob: { type: Date, required: true },
    discriminator: {
      type: String,
      required: false,
      default: () => Math.floor(1000 + Math.random() * 9000).toString(),
    },
    roles: {
      isPlayer: { type: Boolean, default: true },
      isCoach: { type: Boolean, default: false },
    },
    profile: {
      avatar: { type: String },
      bio: { type: String },
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
    },
    status: {
      type: String,
      enum: ["online", "idle", "dnd", "offline"],
      default: "online",
    },
    friends: [
      {
        username: { type: String, required: true },
        discriminator: { type: String, required: true },
        avatar: { type: String },
        status: {
          type: String,
          enum: ["offline", "online", "dnd", "idle"],
          default: "offline",
        },
      },
    ],
    blockedUsers: [
      {
        username: { type: String, required: true },
        discriminator: { type: String, required: true },
      },
    ],
    preferences: {
      theme: { type: String, enum: ["light", "dark"], default: "dark" },
      notifications: { type: Boolean, default: true },
    },
    temporaryGroups: [
      {
        groupId: { type: Schema.Types.ObjectId, ref: "Group" },
        expiresAt: { type: Date },
      },
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", schema, "user");
