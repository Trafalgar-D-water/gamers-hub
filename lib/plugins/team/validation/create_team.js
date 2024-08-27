const Joi = require("joi");

module.exports = {
  payload: Joi.object({
    teamName: Joi.string().required(),
  }),
};
