const { Login, GenerateToken } = require('../../controllers/users/users')
const protect = require('../../middlewares/auth/protect')
const loginValidation = require('../../middlewares/validation/schemas/users/login')
const validate = require('../../middlewares/validation/validate')

const UserRouter = require('express').Router()

UserRouter.post('/login', validate(loginValidation), Login, GenerateToken)

module.exports = UserRouter