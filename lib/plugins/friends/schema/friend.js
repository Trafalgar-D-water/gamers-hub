const mongoose = require('mongoose');
const {Schema} = mongoose

const friendSchema =  new Schema({
    requester : {type : String , required : true},
    recipitent : {type : String , required  : true},
    status :{type :String , enum : ['accepted' , 'pending' , 'rejected'] , default :'pending'},
    createdAt : {type : Date , default : Date.now}
})

module.exports = mongoose.model('Friend' , friendSchema , 'friends')