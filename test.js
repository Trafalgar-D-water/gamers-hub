// // /lib
// // │
// // ├── /plugins
// // │   ├── /user
// // │   │   ├── handlers.js       # Handlers for user-related actions
// // │   │   ├── routes.js         # User routes
// // │   │   ├── schema.js         # User schema definition
// // │   │   ├── validation.js     # User validation rules
// // │   │   └── index.js          # User plugin registration
// // │   ├── /profile
// // │   │   └── ...               # Similar structure for profile
// // │   ├── /team
// // │   │   └── ...               # Similar structure for team
// // │   ├── /auth
// // │   │   └── ...               # Similar structure for authentication
// // │   ├── /friend               # New Friend Plugin
// // │   │   ├── handlers.js       # Friend request handlers
// // │   │   ├── routes.js         # Friend routes
// // │   │   ├── schema.js         # Friend request schema
// // │   │   ├── validation.js     # Friend request validation rules
// // │   │   └── index.js          # Friend plugin registration
// // │   └── /socket               # New Socket Plugin
// // │       ├── socketManager.js  # Socket.IO management and events
// // │       └── index.js          # Socket plugin registration
// // │
// // ├── /utils
// // │   ├── logger.js             # Logger utility for application logs
// // │   └── ...                   # Other utilities
// // │
// // └── server.js                 # Main server entry point

// const filteredDonations = csv_data.reduce((acc, data) => {
//     // Get all keys from the data object
//     const dataKeys = Object.keys(data);
  
//     // Check if all required fields are present directly in the data object
//     const isValid = requiredFields.every(field => dataKeys.includes(field));
  
//     // If valid, add extra fields and push to the result array
//     if (isValid) {
//       data.createdBy = profile_id;
//       data.createdByName = profileName;
//       acc.push(data);
//     }
  
//     return acc;
//   }, []);



//   o achieve a schema structure that uses strings for relationships instead of references (ref), you can store IDs as strings and set up indexes to improve query performance. Below is a modified version of your schemas, with no use of ref and optimizations through indexing:

// Guild Schema
// javascript
// Copy code
// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// const GuildSchema = new Schema({
//     name: { type: String, required: true },
//     logo: { type: String }, // Icon URL or path
//     owner: {
//         profileUserId: { type: String, required: true }, // Store the user ID as string
//         profileUserName: { type: String, required: true }, // Store the username
//     },
//     isPublic: { type: Boolean, default: false },
//     categoriesIds: [{ type: String }], // Store category IDs as strings
//     rolesIds: [{ type: String }], // Store role IDs as strings
//     members: [{ type: String }], // Store member IDs as strings
//     bannedUsers: [{ type: String }], // Store banned user IDs as strings
//     invites: [{ type: String }], // Store invite IDs as strings
//     createdAt: { type: Date, default: Date.now },
//     updatedAt: { type: Date, default: Date.now },
// }, { timestamps: true });

// // Create indexes for faster query performance
// GuildSchema.index({ 'owner.profileUserId': 1 }); // Indexing owner ID
// GuildSchema.index({ isPublic: 1 }); // Indexing public/private servers
// GuildSchema.index({ categoriesIds: 1 }); // Indexing categories for quick lookup

// module.exports = mongoose.model('Guild', GuildSchema, 'Guilds');
// Category Schema
// javascript
// Copy code
// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// const CategorySchema = new Schema({
//     name: { type: String, required: true },
//     guildId: { type: String, required: true }, // Guild ID as string
//     position: { type: Number, default: 0 }, // Helps with ordering categories
//     createdAt: { type: Date, default: Date.now },
//     updatedAt: { type: Date, default: Date.now },
// });

// // Index for faster lookups by guildId
// CategorySchema.index({ guildId: 1 });
// CategorySchema.index({ position: 1 });

// module.exports = mongoose.model('Category', CategorySchema, 'Categories');
// Channel Schema
// javascript
// Copy code
// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// const ChannelSchema = new Schema({
//     name: { type: String, required: true },
//     type: { type: String, enum: ['text', 'voice'], required: true },
//     categoryId: { type: String, required: true }, // Category ID as string
//     guildId: { type: String, required: true }, // Guild ID as string
//     position: { type: Number }, // Order of the channel within the category
//     topic: { type: String }, // Topic of the text channel
//     permissions: [
//         {
//             roleId: { type: String }, // Role ID as string
//             allow: [String], // Allowed permissions
//             deny: [String], // Denied permissions
//         },
//     ],
//     createdAt: { type: Date, default: Date.now },
//     updatedAt: { type: Date, default: Date.now },
// });

// // Index for efficient query on guildId and categoryId
// ChannelSchema.index({ guildId: 1 });
// ChannelSchema.index({ categoryId: 1 });
// ChannelSchema.index({ position: 1 });

// module.exports = mongoose.model('Channel', ChannelSchema, 'Channels');
// Member Schema
// javascript
// Copy code
// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// const MemberSchema = new Schema({
//     userId: { type: String, required: true }, // Store the user ID as string
//     username: { type: String, required: true },
//     discriminator: { type: String, required: true }, // Unique 4-digit discriminator (e.g., #1234)
//     roleIds: [{ type: String }], // Array of role ObjectId strings
//     status: {
//         type: String,
//         enum: ["online", "offline", "idle", "dnd"],
//         default: "offline",
//     },
//     joinedAt: { type: Date, default: Date.now },
// });

// // Index for quick searches on userId
// MemberSchema.index({ userId: 1 });
// MemberSchema.index({ status: 1 });

// module.exports = mongoose.model('Member', MemberSchema, 'Members');
// Role Schema
// javascript
// Copy code
// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// const RoleSchema = new Schema({
//     name: { type: String, required: true },
//     color: { type: String }, // Hex color for the role
//     permissions: [String], // Array of permissions (e.g., "MANAGE_CHANNELS", "SEND_MESSAGES")
// });

// // Index on role name for faster lookups
// RoleSchema.index({ name: 1 });

// module.exports = mongoose.model('Role', RoleSchema, 'Roles');
// Banned User Schema
// javascript
// Copy code
// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// const BannedUserSchema = new Schema({
//     userId: { type: String, required: true }, // User ObjectId as string
//     username: { type: String, required: true },
//     discriminator: { type: String, required: true },
//     reason: { type: String },
//     bannedAt: { type: Date, default: Date.now },
// });

// // Index on userId for banned user lookups
// BannedUserSchema.index({ userId: 1 });

// module.exports = mongoose.model('BannedUser', BannedUserSchema, 'BannedUsers');
// Key Considerations:
// Indexing: Indexes on guildId, categoryId, userId, and roleId improve performance when querying large datasets.
// No ref: All relationships are represented using string IDs directly, as requested.
// Permissions: Permissions are handled directly in arrays for flexibility in channels and roles.
// This structure allows you to manage relationships using string IDs without relying on MongoDB's population feature. You can still retrieve related data via manual queries.






yoo hooo