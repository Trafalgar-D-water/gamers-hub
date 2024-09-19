// role.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const RoleSchema = new Schema({
  name: { type: String, required: true },
  color: { type: String }, // Hex color for the role
  permissions: [String], // Array of permissions (e.g., "MANAGE_CHANNELS", "SEND_MESSAGES")
});

module.exports = mongoose.model('Role', RoleSchema, 'Roles');
