const Joi = require('joi')

const schema = (key) => Joi.object().keys({
  tell: Joi.string().lowercase().min(9).max(12).required(),
  password: Joi.string().min(6).lowercase().max(120).required()
})

module.exports = schema;