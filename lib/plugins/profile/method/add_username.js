const profileModel = require("../schema/profile");
module.exports = {
  name: "add_user_while_singup_in_profile",
  method: async (userId, username) => {
    try {
      const newProfile = new profileModel({
        userId: userId.toString(),
        username: username,
      });

      await newProfile.save();
      return {newProfile}
    } catch (error) {
      console.log(error);
      throw new Error("error creating profile while signup", error.message);
    }
  },
};
