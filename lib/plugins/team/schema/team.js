"use strict";

const mongoose = require("mongoose");
const { Schema } = mongoose;

const temaSchema = new Schema(
  {
    teamName: { type: String, required: true },
    maxMember: { type: Number, default: 0 },
    image: { type: String, default: "" },
    game: { type: String, default: "" },
    members: [
      {
        username: { type: String, required: false },
        email: { type: String, required: false },
        role: { type: String, default :'member'  },
        // teamRole :{}
      },
    ],
    creator: {
      userId : {type : String  , required : true},
      username : {type :String , required : true },
      email : {type : String , required : true}
    },
    invites: [
        {
          inviteCode: { type: String, required: true, unique: true },
          invitedUsername: { type: String, required: true },
          status: { type: String, enum: ["pending", "accepted" , "declined"], default: "pending" },
          createdAt: { type: Date, default: Date.now },
        }
      ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Team", temaSchema, "Team");
