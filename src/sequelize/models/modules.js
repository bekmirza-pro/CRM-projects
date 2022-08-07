module.exports = (sequelize, DataTypes) => {
    const modules = sequelize.define('modules', {
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
        role_id: {
            type: DataTypes.UUID,
            allowNull: false
        }
      }, {
        updatedAt: 'updated_at',
        createdAt: 'created_at'
      });
    
      return modules
}