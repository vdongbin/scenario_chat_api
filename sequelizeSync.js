const { sequelize } = require('./models');

sequelize
  .sync()
  .then(() => {
    process.exit();
  })
  .catch((err) => {
    console.error(err);
    process.exit();
  });
