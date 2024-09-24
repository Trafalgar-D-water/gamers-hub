const mongoose = require('mongoose');


const{Schema} = mongoose;

const GuildSchema = new Schema({
    name : {type : String  , required : true},
    logo : {type : String }, // icon
    owner:{
        profileUserId : {type : String , required : true},
        ProfileUserName :{ type: String ,required : true, },
        // discriminator : {type : Number }
    },
    isPublic : {type : Boolean , default : false },

    categoriesIds: [{type : String }],

      rolesIds: [{type : String}],
      members: [{type : String}],
  
      // Banned users
      bannedUsers: [{type : String }],
  
      // Invites
      invites: [{type : String}],
  
      createdAt: { type: Date, default: Date.now }, 
      updatedAt: { type: Date, default: Date.now },

}, { timestamps: true })

module.exports = mongoose.model('Guild' , GuildSchema , 'Guilds')


//methods are not register