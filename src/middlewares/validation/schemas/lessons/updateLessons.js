const Joi = require('joi')

const schema = (key) => Joi.object().keys({
    lesson_name:Joi.string().max(64),
    science: Joi.string().max(64),
    teacher_id:Joi.string().guid({version:'uuidv4'}),
    lesson_time:Joi.date(),
    students_number: Joi.number(),
    lessons_number:Joi.number()
})

module.exports = schema