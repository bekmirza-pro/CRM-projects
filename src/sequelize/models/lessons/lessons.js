module.exports = (sequelize, DataTypes) => {
    const lessons = sequelize.define('lessons', {
        id: {
          type: DataTypes.UUID,
          defaultValue: sequelize.Sequelize.UUIDV4,
          primaryKey: true,
          allowNull: false
        },
        lesson_name: {
          type: DataTypes.STRING(64),
          allowNull: false
        },
        science: {
          type: DataTypes.STRING(64),
          allowNull: false
        },
        teacher_id: {
            type: DataTypes.UUID,
            allowNull: false
          },
        lesson_time: {
            type: DataTypes.DATE,
            allowNull: false
          },
        students_number: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
        lessons_number: {
            type: DataTypes.INTEGER,
            allowNull: false
          }
      }, {
        updatedAt: 'updated_at',
        createdAt: 'created_at'
      });
    
      return lessons
}