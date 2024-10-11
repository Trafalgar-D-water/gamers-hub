const MemberModel  = require('../../schema/member')
const { Boom } = require("@hapi/boom")

module.exports = async (request , h) =>{
    const {auth: {credentials} , payload , params} = request;
    try{
        const allMembers = await MemberModel.find({guildId : params.guildId.toString()}).lean();

        return {
            StatusCode : 200,
            message : 'member retrived',
            data : allMembers

        }
    }catch(error){
        console.log(error)
        return Boom.badRequest('something went wrong ')
    }
}