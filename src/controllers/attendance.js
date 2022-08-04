const sequelize = require("../sequelize/db");
const { attendance, users, groups } = sequelize.models;

module.exports = class SubmitsController{
    static async GetAllAttendance(req, res, next) {
        try {
            const all_attendance = await attendance.findAll();

            res.status(200).json({
                success: true,
                message: "attendance",
                data: {
                    attendance: all_attendance
                }
            })

        } catch (error) {
            next(error)
        }
    }

    static async GetOne(req, res, next) {
        try {
            const { params } = req;
            
            const attendanceOne = await attendance.findOne({
                where: {
                    id: params.id
                },
                include: [
                    {
                        model: users
                    },
                    {
                        model: groups
                    }
                ]
            });

            res.status(200).json({
                success: true,
                message: "attendance",
                data: {
                    attendanceOne
                }
            })

        } catch (error) {
            next(error)
        }
    }

    static async CreateAttendance(req, res, next) {
        try {
            
            const { body } = req;

            const new_attendance = await attendance.create({
                ...body
            });


            res.status(201).json({
                success: true,
                message: "Attendance was created succesfully!",
                data: {
                    attendance: new_attendance
                }
            })

        } catch (error) {
            next(error)
        }
    }

    static async DeleteAttendance(req, res, next) {
        try {
            const { params } = req;

            const isExist = await attendance.findOne({
                where: {
                    id: params.id
                }
            });

            if(!isExist) throw new res.error(400, "Attendance is not found!");

            // await attendance_lists.destroy({
            //     where: {
            //         attendance_id: params.id
            //     }
            // })

            await attendance.destroy({
                where: {
                    id: params.id
                }
            });

            res.status(200).json({
                success: true,
                message: "Attendance was deleted succesfully!"
            })
        } catch (error) {
            next(error)
        }
    }

    static async UpdateAttendance(req, res, next) {
        try {
            
            const { params, body } = req;

            const isExist = await attendance.findOne({
                where: {
                    id: params.id
                }
            });

            if(!isExist) throw new res.error(400, "Attendance is not found!");

            const updated_attendance = await attendance.update({
                user_id: body.user_id,
                group_id: body.group_id,
                date:body.date,
                attendance:body.attendance
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
                    attendance: updated_attendance
                }
            })
        } catch (error) {
            next(error)
        }
    }

}