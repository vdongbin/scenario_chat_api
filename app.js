const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const skillRouter = require('./routes/skills');
const { sequelize } = require('./models');
const port = process.env.SERVER_PORT || 3000;

// set server and database
const app = express();
sequelize.sync();

// use middleware
((env) => {
  switch (env) {
    case 'development':
      app.use(morgan('dev'));
      break;
    case 'production':
      app.use(morgan('combined'));
      break;
  }
})(process.env.NODE_ENV);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// use router
app.use('/api/skills', skillRouter);

// handle not found 404
app.use((req, res) => {
  return res.status(404).send({ error: 'Not found' });
});

const server = app.listen(port, function () {
  console.log('Server is listening on ' + port);
});

// exports server for test
module.exports = server;
