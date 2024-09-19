const mongoose = require('mongoose');
const {Schema} = mongoose;


const CatagorySchema = new Schema({
    name: {
        type: String,
        required: true,
      },
      GuildId: { type : String },
      position: {
        type: Number,
        default: 0,  // Helps with ordering categories
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      }
})

module.exports = mongoose.model('catagorys' , CatagorySchema , 'catagories')