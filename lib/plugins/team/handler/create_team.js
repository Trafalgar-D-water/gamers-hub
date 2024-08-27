const Boom = require("@hapi/boom");
const Team = require("../schema/team");
module.exports = async (request, h) => {
  try {
    const {teamName } = request.payload;
    const user = request.auth.credentials;
    console.log('This is my user comming form the handler credentials' , user);
    
    const team = new Team({
        teamName,
        creator: user._id
    })

    const savedStudent = await team.save();
    return h.response(savedStudent).code(201)

  } catch (e) {
    console.log(e);
    Boom.badRequest("Create Team error", e);
  }
};
