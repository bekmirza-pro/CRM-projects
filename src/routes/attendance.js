const {GetAllAttendance, GetOne, CreateAttendance, DeleteAttendance, UpdateAttendance } = require('../controllers/attendance')
const validate = require('../middlewares/validation/validate')
const paramSchema = require("../middlewares/validation/schemas/params") 
const update_attendance = require("../middlewares/validation/schemas/attendance/updateAttendance")

const AttendanceRouter = require('express').Router()

AttendanceRouter.get('/', GetAllAttendance);
AttendanceRouter.get("/:id",  validate(paramSchema, "params"), GetOne);
AttendanceRouter.post('/create', CreateAttendance);
AttendanceRouter.put('/:id',  validate(paramSchema, "params"),  validate(update_attendance), UpdateAttendance);
AttendanceRouter.delete('/:id',  validate(paramSchema, "params"), DeleteAttendance);


module.exports = AttendanceRouter