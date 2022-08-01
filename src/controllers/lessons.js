const sequelize = require("../sequelize/db");
const { lessons, users } = sequelize.models;

module.exports = class SubmitsController{
    static async GetAllLessons(req, res, next) {
        try {
            const all_lessons = await lessons.findAll();

            res.status(200).json({
                success: true,
                message: "lessons",
                data: {
                    lesson: all_lessons
                }
            })

        } catch (error) {
            next(error)
        }
    }

    static async GetOne(req, res, next) {
        try {
            const { params } = req;
            
            const lessonOne = await lessons.findOne({
                where: {
                    id: params.id
                },
                include: [
                    {
                        model: users
                    }
                ]
            });

            res.status(200).json({
                success: true,
                message: "lesson",
                data: {
                    lessonOne
                }
            })

        } catch (error) {
            next(error)
        }
    }

    static async CreateLessons(req, res, next) {
        try {
            
            const { body } = req;

            const new_lessons = await lessons.create({
                ...body
            });


            res.status(201).json({
                success: true,
                message: "Lesson was created succesfully!",
                data: {
                    lesson: new_lessons
                }
            })

        } catch (error) {
            next(error)
        }
    }

    static async DeleteLessons(req, res, next) {
        try {
            const { params } = req;

            const isExist = await lessons.findOne({
                where: {
                    id: params.id
                }
            });

            if(!isExist) throw new res.error(400, "Lesson is not found!");

            // await lesson_lists.destroy({
            //     where: {
            //         lesson_id: params.id
            //     }
            // })

            await lessons.destroy({
                where: {
                    id: params.id
                }
            });

            res.status(200).json({
                success: true,
                message: "Lesson was deleted succesfully!"
            })
        } catch (error) {
            next(error)
        }
    }

    static async UpdateLessons(req, res, next) {
        try {
            
            const { params, body } = req;

            const isExist = await lessons.findOne({
                where: {
                    id: params.id
                }
            });

            if(!isExist) throw new res.error(400, "Lesson is not found!");

            const updated_lessons = await lessons.update({
                lesson_name: body.lesson_name,
                science: body.science,
                teacher_id: body.teacher_id, 
                lesson_time: body.lesson_time,
                students_number: body.students_number,
                lessons_number: body.lessons_number
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
                    lesson: updated_lessons
                }
            })
        } catch (error) {
            next(error)
        }
    }

}