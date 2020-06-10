module.exports = (sequelize, DataTypes) => {
  return sequelize.define('cards', {
    name: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('NOW()')
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('NOW()')
    }
  });
};
