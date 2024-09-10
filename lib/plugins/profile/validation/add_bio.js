const Joi = require('joi')

module.exports = {
    payload : Joi.object({
        bio : Joi.string().min(1).max(50).required()
    })
}