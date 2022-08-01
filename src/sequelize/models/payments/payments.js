module.exports = (sequelize, DataTypes) => {
  const payments = sequelize.define(
    "payments",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: sequelize.Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      tell: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      payments: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      updatedAt: "updated_at",
      createdAt: "created_at",
    }
  );

  return payments;
};
