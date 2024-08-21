"use strict";

const Joi = require("joi");

module.exports = {
  payload: Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(30).required(),
    dob: Joi.date().required(),
  }),
};
