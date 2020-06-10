module.exports = (sequelize, DataTypes) => {
  return sequelize.define('skills', {
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    },
    character: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    initial_stage: {
      type: DataTypes.STRING(20),
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
