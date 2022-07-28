const ErrorResponse = require("../../utils/errorResponse")

module.exports.errorMiddleware = (req, res, next) => {
    res.error = ErrorResponse;
    next()
}