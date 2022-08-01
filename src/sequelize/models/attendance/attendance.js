module.exports = (sequelize, DataTypes) => {
    const attendance = sequelize.define('attendance', {
        id: {
          type: DataTypes.UUID,
          defaultValue: sequelize.Sequelize.UUIDV4,
          primaryKey: true,
          allowNull: false
        },
        user_id: {
          type: DataTypes.UUID,
          defaultValue: sequelize.Sequelize.UUIDV4,
          allowNull: false
        },
        group_id: {
          type: DataTypes.UUID,
          defaultValue: sequelize.Sequelize.UUIDV4,
          allowNull: false
        },
        date: {
          type: DataTypes.DATE,
          allowNull: false
        },
        attendance: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
          allowNull: false
        }
      }, {
        updatedAt: 'updated_at',
        createdAt: 'created_at'
      });
    
      return attendance
}