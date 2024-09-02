const Boom = require("@hapi/boom");
const crypto = require("crypto");
const Team = require("../schema/team");
module.exports = async (request, h) => {
  try {
    const { teamId, inviteUsername } = request.payload;
    const inviteCode = crypto.randomBytes(4).toString("hex");
    console.log(inviteCode);
    const user = request.auth.credentials;

    // find the team
    const team = await Team.findOne({ _id: teamId });
    console.log(team);
    if (!team) {
      return Boom.notFound("team not found");
    }

    // check if the user is the team creator
    if (team.creator.userId != user.id.toString()) {
      return Boom.forbidden("Only the team creator can create the invite");
    }

    // check if the invite already exist
    const existingInvite = team.invites.find(
      (invite) =>
        invite.invitedUsername === inviteUsername &&
        invite.status === "pending"
    );
    if (existingInvite) {
      return Boom.badRequest("already invited");
    }
    team.invites.push({
        inviteCode,
        invitedUsername,
        status: 'pending'
      });
  
      await team.save();
      return h.response({ inviteCode }).code(201);
      
  } catch (error) {
    console.log(error);
    return Boom.badRequest("invite link not generated");
  }
};
