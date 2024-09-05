'use strict';
const Joi = require('joi');

module.exports = {
  payload: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
};
