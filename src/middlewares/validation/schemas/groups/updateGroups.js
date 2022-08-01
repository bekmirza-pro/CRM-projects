const Joi = require('joi')

const schema = (key) => Joi.object().keys({
    title: Joi.string().min(3),
    description: Joi.string().min(10).max(128),
    type: Joi.string().max(32),
    date: Joi.string()
})

module.exports = schema