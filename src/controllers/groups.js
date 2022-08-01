const sequelize = require("../sequelize/db")
const { groups } = sequelize.models;

module.exports = class GroupsController{
    static async GetAllGroups(req, res, next) {
        try {
            const all_group = await groups.findAll();

            res.status(200).json({
                success: true,
                message: "group",
                data: {
                    group: all_group
                }
            })

        } catch (error) {
            next(error)
        }
    }

    static async GetOne(req, res, next) {
        try {
            const { params } = req;
            
            const group = await groups.findOne({
                where: {
                    id: params.id
                },
                // include: [
                //     {
                //         model: group_lists
                //     }
                // ]
            });

            res.status(200).json({
                success: true,
                message: "group",
                data: {
                    group
                }
            })

        } catch (error) {
            next(error)
        }
    }

    static async CreateGroup(req, res, next) {
        try {
            
            const { body } = req;

            const new_group = await groups.create({
                ...body
            });


            res.status(201).json({
                success: true,
                message: "Group was created succesfully!",
                data: {
                    group: new_group
                }
            })

        } catch (error) {
            next(error)
        }
    }

    static async DeleteGroup(req, res, next) {
        try {
            const { params } = req;

            const isExist = await groups.findOne({
                where: {
                    id: params.id
                }
            });

            if(!isExist) throw new res.error(400, "Group is not found!");

            // await group_lists.destroy({
            //     where: {
            //         group_id: params.id
            //     }
            // })

            await groups.destroy({
                where: {
                    id: params.id
                }
            });

            res.status(200).json({
                success: true,
                message: "Group was deleted succesfully!"
            })
        } catch (error) {
            next(error)
        }
    }

    static async UpdateGroup(req, res, next) {
        try {
            
            const { params, body } = req;

            const isExist = await groups.findOne({
                where: {
                    id: params.id
                }
            });

            if(!isExist) throw new res.error(400, "Group is not found!");

            const updated_group = await groups.update({
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
                    group: updated_group
                }
            })
        } catch (error) {
            next(error)
        }
    }

}