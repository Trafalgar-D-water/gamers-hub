const Joi = require('joi')

module.exports = {
    payload : Joi.object({
        bio : Joi.string().min(3).max(50).required()
    })
}