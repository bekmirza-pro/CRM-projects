
const UserRouter = require("./users/users");
const GroupRouter = require("./groups");
const AttendanceRouter = require("./attendance");
const LessonsRouter = require("./lessons");
const CourseRouter = require("./courses");
const PaymentRouter = require("./payments");

const router = require("express").Router();
 
router.use("/users", UserRouter);
router.use("/groups", GroupRouter);
router.use("/attendance", AttendanceRouter);  
router.use("/lessons", LessonsRouter);  
router.use("/courses", CourseRouter);
router.use("/payments", PaymentRouter);

module.exports = router