const sequelize = require("../sequelize/db");
const { course } = sequelize.models;

module.exports = class SubmitsController{
    static async GetAllCourses(req, res, next) {
        try {
            const all_course = await course.findAll();

            res.status(200).json({
                success: true,
                message: "courses",
                data: {
                    course: all_course
                }
            })

        } catch (error) {
            next(error)
        }
    }

    static async GetOne(req, res, next) {
        try {
            const { params } = req;
            
            const courseOne = await course.findOne({
                where: {
                    id: params.id
                }
            });

            res.status(200).json({
                success: true,
                message: "course",
                data: {
                    courseOne
                }
            })

        } catch (error) {
            next(error)
        }
    }

    static async CreateCourse(req, res, next) {
        try {
            
            const { body } = req;

            const new_course = await course.create({
                ...body
            });

            res.status(201).json({
                success: true,
                message: "Course was created succesfully!",
                data: {
                    course: new_course
                }
            })

        } catch (error) {
            next(error)
        }
    }

    static async DeleteCourse(req, res, next) {
        try {
            const { params } = req;

            const isExist = await course.findOne({
                where: {
                    id: params.id
                }
            });

            if(!isExist) throw new res.error(400, "Course is not found!");

            // await course_lists.destroy({
            //     where: {
            //         course_id: params.id
            //     }
            // })

            await course.destroy({
                where: {
                    id: params.id
                }
            });

            res.status(200).json({
                success: true,
                message: "Course was deleted succesfully!"
            })
        } catch (error) {
            next(error)
        }
    }

    static async UpdateCourse(req, res, next) {
        try {
            
            const { params, body } = req;

            const isExist = await course.findOne({
                where: {
                    id: params.id
                }
            });

            if(!isExist) throw new res.error(400, "Course is not found!");

            const updated_course = await course.update({
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
                    course: updated_course
                }
            })
        } catch (error) {
            next(error)
        }
    }

}