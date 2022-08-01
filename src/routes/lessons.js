const {GetAllLessons, GetOne, CreateLessons, DeleteLessons, UpdateLessons } = require('../controllers/lessons')
const validate = require('../middlewares/validation/validate')
const paramSchema = require("../middlewares/validation/schemas/params") 
const update_lessons = require("../middlewares/validation/schemas/lessons/updateLessons")

const LessonRouter = require('express').Router()

LessonRouter.get('/', GetAllLessons);
LessonRouter.get("/:id",  validate(paramSchema, "params"), GetOne);
LessonRouter.post('/create', CreateLessons);
LessonRouter.put('/:id',  validate(paramSchema, "params"),  validate(update_lessons), UpdateLessons);
LessonRouter.delete('/:id',  validate(paramSchema, "params"), DeleteLessons);


module.exports = LessonRouter