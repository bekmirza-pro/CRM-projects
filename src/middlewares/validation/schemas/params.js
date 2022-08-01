const Joi = require('joi');

const schema = (key = "required") => Joi.object().keys({
  id: Joi.string().uuid()[key](),
});


module.exports = schema;