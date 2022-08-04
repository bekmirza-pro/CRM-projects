const Joi = require('joi');

const schema = (key = "optional") => Joi.object().keys({
  file: Joi.object().keys({
    size: Joi.number().integer().required(),
    mimetype: Joi.string().max(256).required(),
    name: Joi.string().max(256).required(),
    data: Joi.required(),
    encoding: Joi.required(),
    tempFilePath: Joi.required(),
    truncated: Joi.required(),
    md5: Joi.required(),
    mv: Joi.required(),
  }).required()
});


module.exports = schema;