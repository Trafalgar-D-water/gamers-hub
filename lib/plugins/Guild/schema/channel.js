const mongoose = require('mongoose')
const  {Schema} = mongoose;


const ChannelSchema = new Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ['text', 'voice'], required: true },
    categoryId: { type: String }, // ObjectId of the category this channel belongs to
    GuildId : {type : String},
    position: { type: Number }, // Order of the channel within the category or guild
    topic: { type: String }, // Topic of the text channel
    permissions: [
      {
        roleId: { type: String },
        allow: [String],
        deny: [String],
      },
    ],
  });

module.exports = mongoose.model('channel' , ChannelSchema , 'channel')




// Text Channels
//   - general
//   - memes
//   - random

// Voice Channels
//   - general voice
//   - gaming voice


// 1. general (position: 1)
// 2. memes (position: 2)
// 3. admin (position: 3)



// Text Channels
// 1. general (position: 1)
// 2. memes (position: 2)
// 3. random (position: 3)

// Voice Channels
// 1. general voice (position: 1)
// 2. gaming voice (position: 2)



// Great question! In a Discord-like application, the concepts of position and category play important roles in organizing channels and providing a better user experience. Let's break down these terms:

// 1. Category:
// A category is a group or collection of channels. It helps organize channels into logical sections.
// For example, in a Discord-like server, you might have categories like "Text Channels," "Voice Channels," or "Admin Channels."
// Channels that belong to the same category are displayed together in the UI. Categories help users navigate and find channels more easily, especially when there are many channels in the server.
// Example:

// plaintext
// Copy code
// Text Channels
//   - general
//   - memes
//   - random

// Voice Channels
//   - general voice
//   - gaming voice
// Here, "Text Channels" and "Voice Channels" are categories, and the channels (e.g., "general", "memes") are grouped under them.

// 2. Position:
// The position represents the order of the channel or category within the server.
// It controls how channels and categories are displayed in the UI, typically top to bottom.
// Channels or categories with lower position numbers will appear higher in the list, while those with higher position numbers will appear lower.
// In simpler terms, position determines where a channel or category appears relative to others. For example, you may want a "general" text channel to appear first and "admin" channels to appear last.

// Example:

// plaintext
// Copy code
// 1. general (position: 1)
// 2. memes (position: 2)
// 3. admin (position: 3)
// Why We Need Category and Position:
// Category:
// Categories are important for organizing channels, making it easier for users to navigate the server.
// Without categories, all channels would be listed together, which can become confusing in large servers with many channels.
// Categories let you group related channels together (e.g., all "voice channels" under a "Voice" category).
// Position:
// The position helps define the order in which channels and categories are displayed.
// This improves usability by allowing admins to control the priority and visibility of certain channels.
// For example, a "welcome" or "rules" channel might have a top position so it's the first thing users see, while an "admin" channel might be placed lower.
// Where You Can Use It:
// In a Guild Schema (Server):

// You define the position of categories and channels within the server (guild) so that users see the channels in a specific order.
// Example: Make a "General" category appear at the top of the list and "Admin" at the bottom.
// In a Channel Schema:

// Each channel can have a position field to specify its order within the category or within the guild.
// If channels belong to a category, the position helps you arrange them inside the category. For example, in the "Text Channels" category, you may want the "general" channel to come first and "memes" channel to come after.
// Example in Code:
// In the ChannelSchema, you define the position and category like this:

// javascript
// Copy code
// const ChannelSchema = new Schema({
//   name: { type: String, required: true },
//   type: { type: String, enum: ['text', 'voice'], required: true },
//   categoryId: { type: String }, // ObjectId of the category this channel belongs to
//   position: { type: Number }, // Order of the channel within the category or guild
//   topic: { type: String }, // Topic of the text channel
//   permissions: [
//     {
//       roleId: { type: String },
//       allow: [String],
//       deny: [String],
//     },
//   ],
// });
// The categoryId links the channel to its category (if it's in one). If the category is null, it could mean that the channel is not part of any category and is at the top level.
// The position controls the order of this channel within its category or guild.
// Example Usage:
// 1. Category and Position in the UI:
// You want your UI to list channels in a specific order:

// plaintext
// Copy code
// Text Channels
// 1. general (position: 1)
// 2. memes (position: 2)
// 3. random (position: 3)

// Voice Channels
// 1. general voice (position: 1)
// 2. gaming voice (position: 2)
// If the position values for these channels are changed, their order would change.

// 2. Without Categories:
// Channels could be displayed in the server without any grouping if there are no categories:

// plaintext
// Copy code
// 1. general (position: 1)
// 2. gaming voice (position: 2)
// 3. memes (position: 3)
// 4. random (position: 4)
// In Conclusion:
// Categories help you organize channels into groups.
// Position ensures a controlled and intentional order of channels and categories, improving server organization and user experience.
