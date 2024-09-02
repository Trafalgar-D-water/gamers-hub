const Boom = require("@hapi/boom");
const Team = require("../schema/team");
const UserModel = require('../../users/schema/users')
module.exports = async (request, h) => {
  // implemet for all u just taking team name what if other fileds are entered
  try {
    const { teamName } = request.payload;
    const user = request.auth.credentials;  
    const team = new Team({
      teamName,
      creator: {
        userId: user.id.toString(),
        username: user.username,
        email: user.email,
      },
    });

    const savedStudent = await team.save();
    return h.response(savedStudent).code(201);
  } catch (e) {
    console.log(e);
    return Boom.badRequest("Create Team error", e);
  }
};
