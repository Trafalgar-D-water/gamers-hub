const GuildModel = require('../schema/guild');
const MemberModel = require('../schema/member')
const { Boom } = require("@hapi/boom");

module.exports = async (request, h) => {
    const { auth: { credentials }, server, params } = request;
    const { guildId } = params;
    const loggedInUserId = credentials.id;
    try {
        const getProfile = await server.methods.get_proflieId_by_userId(loggedInUserId);
        if (!getProfile || getProfile.length === 0) {
            console.log(`Profile not found for user: ${loggedInUserId}`);
            return Boom.notFound('User profile not found');
        }
        const guild = await GuildModel.findById(guildId);
        if (!guild) {
            console.log(`Guild not found: ${guildId}`);
            return Boom.notFound('Guild not found');
        }
        if (guild.owner.profileUserId.toString() === getProfile[0].userId.toString()) {
            console.log('User is the owner of the guild');
            return Boom.badRequest('You are already the owner of this guild');
        }

        if (guild.members.includes(getProfile[0].userId)) {
            console.log('User is already a member of the guild');
            return Boom.badRequest('User is already a member of this guild');
        }
        guild.members.push(getProfile[0].userId);
        await guild.save();
        const memberUpdate = new MemberModel({
            userId : loggedInUserId,
            guildId : guildId,
            username :  getProfile[0].username,
            status : 'online'
        })

        const savedMember = await memberUpdate.save();

        
        //socket init
        server.socketService.emitEvent('memberJoined' , {
            guildId : guild._id,
            newMember : {
                userId: getProfile[0].userId,
                username: getProfile[0].username,
            }
        })
        return h.response({
           
           message : 'Joined guild successfully',
           data : {
            guild,
            currentUser : loggedInUserId
           }
        }).code(200);
    } catch (err) {
        return Boom.badImplementation('An error occurred while joining the guild');
    }
};