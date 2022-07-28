 
const UserRouter = require("./users/users");


const router = require("express").Router();

 
router.use("/users", UserRouter) 

module.exports = router