"use strict";

const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema(
  {
    username: { type: String, required: true  },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    dob: { type: Date, required: true },
    verificationToken: { type: String }, // Add this field for the verification token
    isVerified: { type: Boolean, default: false },
    discriminator: {
      type: String,
      required: false,
      default: () => Math.floor(1000 + Math.random() * 9000).toString(),
      unique : true
    },
    roles :{
      type: [String], // Array of roles
      default: ['user'], // Default role
      enum: ['superAdmin', 'admin', 'mod', 'user'] 
    },
    status: {
      type: String,
      enum: ["online", "idle", "dnd", "offline"],
      default: "online",
    },
    guild: [{
      guildId : {type : String },
      name: { type: String }, // Name of the server (if not using ref)
      owner: { type: String }, // Store the owner's ID as a string
    }],
    friendRequests: [
      {
        requester: { type: String, required: true }, // ID of the user who sent the request
        recipient: { type: String, required: true }, // ID of the user who received the request
        createdAt: { type: Date, default: Date.now }, // Timestamp of when the request was sent
      }
    ],

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
    
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", schema, "user");
