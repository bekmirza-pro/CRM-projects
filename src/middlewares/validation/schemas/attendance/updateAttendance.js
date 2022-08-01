
const Joi = require('joi')

const schema = (key) => Joi.object().keys({
    user_id:Joi.string().guid({version:'uuidv4'}),
    group_id:Joi.string().guid({version:'uuidv4'}),
    date: Joi.string(),
    attendance: Joi.boolean(),
})

module.exports = schema