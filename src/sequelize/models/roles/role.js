module.exports = (sequelize, DataTypes) => {
    const roles = sequelize.define('roles', {
        id: {
          type: DataTypes.UUID,
          defaultValue: sequelize.Sequelize.UUIDV4,
          primaryKey: true,
          allowNull: false
        },
        name: {
          type: DataTypes.STRING(64),
          allowNull: false
        },
        description: {
          type: DataTypes.STRING(64),
          allowNull: false
        }
      }, {
        updatedAt: 'updated_at',
        createdAt: 'created_at'
      });
    
      return roles
}