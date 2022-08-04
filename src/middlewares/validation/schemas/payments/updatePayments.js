const Joi = require('joi')

const schema = (key) => Joi.object().keys({
    tell: Joi.string().min(9).max(12),
    payments: Joi.boolean()
})

module.exports = schema