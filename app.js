const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

const skillRouter = require('./routes/skills');
const { sequelize } = require('./models');

const port = process.env.SERVER_PORT || 3000;
const app = express();
sequelize.sync();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/skills', skillRouter);

app.use((req, res) => {
  return res.status(404).send({ error: 'Not found' });
});

app.listen(port, function () {
  console.log('Server is listening on ' + port);
});
