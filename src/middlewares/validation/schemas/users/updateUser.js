const Joi = require('joi')

const schema = (key) => Joi.object().keys({
    username: Joi.string().min(3),
    age: Joi.number().integer(),
    tell: Joi.string().min(9).max(12),
    password: Joi.string().min(6)
})

module.exports = schema