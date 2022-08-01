module.exports = (sequelize, DataTypes) => {
    const user_roles = sequelize.define('user_roles', {
      id: {
        type: DataTypes.UUID,
        defaultValue: sequelize.Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      user_id: {
        type: DataTypes.UUID,
        references: {
          model: "users",
          key: "id"
        },  
      },
      role_id: {
        type: DataTypes.UUID,
        references: {
          model: "roles",
          key: "id"
        },  
      }
    }, {
      updatedAt: 'updated_at',
      createdAt: 'created_at'
    }); 
    return user_roles
  }