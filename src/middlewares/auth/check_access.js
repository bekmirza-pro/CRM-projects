const sequelize = require("../../sequelize/db");
const {
    user_roles,
    modules,
    roles
} = sequelize.models

const check_access = (module_name) => {
    return async (req, res, next) => {
        try {
            const {
                user
            } = req 

            const all_modules = await user_roles.findAll({
                where: {
                    user_id: user.id,
                }, 
                include: [
                    {
                        model: roles,
                        include: [
                            {
                                model: modules
                            }
                        ]
                    }
                ],
                raw: true
            });  

            const existance = all_modules.find(e => e["role.modules.name"] == module_name);  
            if (!existance) throw new res.error(400, "Access denied!")

            next()

        } catch (error) { 
            next(error)
        }
    }
}
module.exports = check_access