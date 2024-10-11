const profileModel = require('../schema/profile')

module.exports  ={
    name : 'get_member_brief',
    method : async  (userId)=>{
        try{
            const memberBrief = await profileModel.findOne({userId : userId.toString()} ,
            {
                userId : 1,
                username : 1,
                role : 1,
                bio : 1,
                avatar : 1,
            }
            ).lean();

            if(!memberBrief){
                console.log('Member brief not found')
                return null
            }

            return memberBrief;
        }
        catch(error){
            console.log(error)
            throw new Error('Error in get_member_brief')
        }
    }
}