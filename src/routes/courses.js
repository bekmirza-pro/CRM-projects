const {GetAllCourses, GetOne, CreateCourse, DeleteCourse, UpdateCourse } = require('../controllers/courses')
const validate = require('../middlewares/validation/validate')
const paramSchema = require("../middlewares/validation/schemas/params") 
const update_course = require("../middlewares/validation/schemas/courses/updateCourse")

const CoursesRouter = require('express').Router()

CoursesRouter.get('/', GetAllCourses);
CoursesRouter.get("/:id",  validate(paramSchema, "params"), GetOne);
CoursesRouter.post('/create', CreateCourse);
CoursesRouter.put('/:id',  validate(paramSchema, "params"),  validate(update_course), UpdateCourse);
CoursesRouter.delete('/:id',  validate(paramSchema, "params"), DeleteCourse);


module.exports = CoursesRouter