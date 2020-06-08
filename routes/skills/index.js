const express = require('express');
const skillRouter = express.Router();
const checkKeyword = require('./middleware/checkKeyword');

const skillsModule = {
  some: require('./some')
};

skillRouter.use(async (req, res, next) => {
  checkKeyword(req, res, next);
});

skillRouter.post('/', async (req, res) => {
  try {
    const { skill } = req.body;
    const controller = skillsModule[skill.name];
    if (controller) {
      const result = await controller(req, res);
      return res.send(result);
    } else {
      return res.status(400).send({ error: 'Invalid skill' });
    }
  } catch (err) {
    console.log(23131, err);
    return res.status(500).send(err);
  }
});

module.exports = skillRouter;