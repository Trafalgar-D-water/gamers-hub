"use strict";

const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    dob: { type: Date, required: true },
    discriminator: {
      type: String,
      required: false,
      default: () => Math.floor(1000 + Math.random() * 9000).toString(),
    },
    role: { type: String, enum: ["player"], default: "player" },
    profile: {
      avatar: { type: String },
      bio: { type: String },
      skill: [{ type: String }],
      game_preference: [{ type: String }],
      rank: { type: String },
    },
    status: {
      type: String,
      enum: ["online", "idel", "dnd", "offline"],
      default: "offline",
    },
    friends: [
      {
        username: { type: String, required: true },
        discriminator: { type: String, require: true },
        avatar: { type: String },
        Status: {
          type: String,
          enum: ["offline", "online", "dnd", "idle"],
          default: "offline",
        },
      },
    ],
    blocked_users: [
      {
        username: { type: String, required: true },
        discriminator: { type: String, required: true },
      },
    ],
    preferences: {
      theme: { type: String, enum: ["light", "dark"], default: "dark" },
      notifications: { type: Boolean, default: true },
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", schema, "user");
