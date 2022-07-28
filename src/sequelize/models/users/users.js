module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define('users', {
        id: {
          type: DataTypes.UUID,
          defaultValue: sequelize.Sequelize.UUIDV4,
          primaryKey: true,
          allowNull: false
        },
        username: {
          type: DataTypes.STRING(64),
          allowNull: false,
          unique: true
        },
        password: {
          type: DataTypes.STRING(72),
          allowNull: false
        }, 
      }, {
        updatedAt: 'updated_at',
        createdAt: 'created_at'
      });
    
      return users
}