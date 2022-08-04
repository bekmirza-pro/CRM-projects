const connections = async (sequelize) => {
    const {users, roles, user_roles, groups, attendance, lessons} = sequelize.models 

    await users.hasMany(user_roles, {
        foreignKey: "user_id",
        allowNull: false,
    })

     await user_roles.belongsTo(users, {
        foreignKey: "user_id",
        allowNull: false,
    })

    await roles.hasMany(user_roles, {
        foreignKey: "role_id",
        allowNull: false,
    });

     await user_roles.belongsTo(roles, {
        foreignKey: "role_id",
        allowNull: false,
    })

    await users.hasMany(attendance, {
        foreignKey: "user_id",
        allowNull: false,
    })

     await attendance.belongsTo(users, {
        foreignKey: "user_id",
        allowNull: false,
    })

    await groups.hasMany(attendance, {
        foreignKey: "group_id",
        allowNull: false,
    })

     await attendance.belongsTo(groups, {
        foreignKey: "group_id",
        allowNull: false,
    })

    await users.hasMany(lessons, {
        foreignKey: "teacher_id",
        allowNull: false,
    })

     await lessons.belongsTo(users, {
        foreignKey: "teacher_id",
        allowNull: false,
    })
 }

 module.exports = connections;