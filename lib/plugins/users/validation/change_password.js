const Joi = require("joi");

module.exports = {
  payload: Joi.object({
    previousPassword: Joi.string()
      .required()
      .description("Current password of the user"),
    newPassword: Joi.string()
      .min(8)
      .required()
      .description("New password for the user"),
    confirmNewPassword: Joi.string()
      .valid(Joi.ref("newPassword"))
      .required()
      .description("Confirmation of the new password"),
  }).label('ChangePasswordRequest')
};
