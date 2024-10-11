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
