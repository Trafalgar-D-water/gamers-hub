const profileModel = require("../schema/profile");
module.exports = {
  name: "update_usermane_and_profile_username",
  method: async (userId, username) => {
    try {
      const upadteProfile = await profileModel.findOneAndUpdate(
        { userId },
        { username },
        { new: true }
      );
      if (!upadteProfile) {
        throw new Error("cant able to update profile");
      }

      return {
        message: "profile also updated",
        data: { upadteProfile },
      };
    } catch (error) {
      console.log(error);
      throw new Error("error creating profile while signup", error.message);
    }
  },
};
