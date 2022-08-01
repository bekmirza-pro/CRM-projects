module.exports = (sequelize, DataTypes) => {
    const groups = sequelize.define('groups', {
        id: {
          type: DataTypes.UUID,
          defaultValue: sequelize.Sequelize.UUIDV4,
          primaryKey: true,
          allowNull: false
        },
        title: {
          type: DataTypes.STRING(64),
          allowNull: false
        },
        description: {
          type: DataTypes.STRING(64),
          allowNull: false
        },
        type: {
            type: DataTypes.STRING(32),
            allowNull: false
          }
      }, {
        updatedAt: 'updated_at',
        createdAt: 'created_at'
      });
    
      return groups
}