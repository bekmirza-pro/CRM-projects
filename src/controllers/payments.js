const sequelize = require("../sequelize/db");
const { payments } = sequelize.models;

module.exports = class SubmitsController{
    static async GetAllPayments(req, res, next) {
        try {
            const all_payments = await payments.findAll();

            res.status(200).json({
                success: true,
                message: "payments",
                data: {
                    payments: all_payments
                }
            })

        } catch (error) {
            next(error)
        }
    }

    static async GetOne(req, res, next) {
        try {
            const { params } = req;
            
            const paymentOne = await payments.findOne({
                where: {
                    id: params.id
                }
            });

            res.status(200).json({
                success: true,
                message: "payments",
                data: {
                    paymentOne
                }
            })

        } catch (error) {
            next(error)
        }
    }

    static async CreatePayment(req, res, next) {
        try {
            
            const { body } = req;

            const new_payment = await payments.create({
                ...body
            });

            res.status(201).json({
                success: true,
                message: "Payment was created succesfully!",
                data: {
                    payments: new_payment
                }
            })

        } catch (error) {
            next(error)
        }
    }

    static async DeletePayment(req, res, next) {
        try {
            const { params } = req;

            const isExist = await payments.findOne({
                where: {
                    id: params.id
                }
            });

            if(!isExist) throw new res.error(400, "Payment is not found!");

            // await payments_lists.destroy({
            //     where: {
            //         payments_id: params.id
            //     }
            // })

            await payments.destroy({
                where: {
                    id: params.id
                }
            });

            res.status(200).json({
                success: true,
                message: "Payment was deleted succesfully!"
            })
        } catch (error) {
            next(error)
        }
    }

    static async UpdatePayment(req, res, next) {
        try {
            
            const { params, body } = req;

            const isExist = await payments.findOne({
                where: {
                    id: params.id
                }
            });

            if(!isExist) throw new res.error(400, "Payment is not found!");

            const updated_payment = await payments.update({
                title: body.title,
                description: body.description,
                type: body.type
            }, {
                where: {
                    id: params.id
                },
                returning: true
            });

            res.status(200).json({
                success: true,
                message: "Succesfully updated!",
                data: {
                    payments: updated_payment
                }
            })
        } catch (error) {
            next(error)
        }
    }

}