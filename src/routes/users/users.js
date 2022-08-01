const {GetAll, GetOne, Register, Login, GenerateToken, UpdateUser, DeleteUser } = require('../../controllers/users')
const protect = require('../../middlewares/auth/protect')
const loginValidation = require('../../middlewares/validation/schemas/users/login')
const validate = require('../../middlewares/validation/validate')
const paramSchema = require("../../middlewares/validation/schemas/params") 
const update_user = require("../../middlewares/validation/schemas/users/updateUser")

const UserRouter = require('express').Router()

UserRouter.get('/', GetAll);
UserRouter.post('/register', Register, GenerateToken);
UserRouter.post('/login', validate(loginValidation), Login, GenerateToken); 
UserRouter.get("/:id",  validate(paramSchema, "params"), GetOne);
UserRouter.put('/:id',  validate(paramSchema, "params"),  validate(update_user), UpdateUser);
UserRouter.delete('/:id',  validate(paramSchema, "params"), DeleteUser);


module.exports = UserRouter