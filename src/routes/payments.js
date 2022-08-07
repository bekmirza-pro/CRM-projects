const {GetAllPayments, GetOne, CreatePayment, DeletePayment, UpdatePayment } = require('../controllers/payments')
const validate = require('../middlewares/validation/validate')
const paramSchema = require("../middlewares/validation/schemas/params") 
const update_payments = require("../middlewares/validation/schemas/payments/updatePayments")

const PaymentRouter = require('express').Router()

PaymentRouter.get('/', GetAllPayments);
PaymentRouter.get("/:id",  validate(paramSchema, "params"), GetOne);
PaymentRouter.post('/create', CreatePayment);
PaymentRouter.put('/:id',  validate(paramSchema, "params"),  validate(update_payments), UpdatePayment);
PaymentRouter.delete('/:id',  validate(paramSchema, "params"), DeletePayment);



module.exports = PaymentRouter