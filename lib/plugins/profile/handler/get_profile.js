const Boom = require("@hapi/boom");
const profileModel = require("../schema/profile");
module.exports = async (request, h) => {
  const {
    server,
    auth: { credentials },
  } = request;

  try {
    console.log('user credintial' , credentials)
    const userId = credentials.id;
    console.log(userId);
    
    const profile = await profileModel.findOne({ userId });
    console.log(profile);

    if (!profile) {
      return Boom.notFound("Profile not found");
    }
    return h
      .response({
        message: "profile found",
        data: profile,
      })
      .code(200);
  } catch (error) {
    console.log(error);
    return Boom.badRequest("somthing went wrong which getting peofile");
  }
};
