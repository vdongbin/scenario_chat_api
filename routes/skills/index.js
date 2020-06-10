const express = require('express');
const skillRouter = express.Router();
const checkKeyword = require('./middleware/checkKeyword');

const skillsModule = {
  some: require('./some')
};

// use middleware that check message
skillRouter.use(async (req, res, next) => {
  checkKeyword(req, res, next);
});

// POST /api/skills
skillRouter.post('/', async (req, res) => {
  try {
    const { skill } = req.body;
    const controller = skillsModule[skill.name];
    if (controller) {
      const result = await controller(req, res);
      if (result.error) {
        return res.status(400).send({ error: result.error });
      }
      return res.send(result);
    } else {
      return res.status(400).send({ error: 'Invalid skill' });
    }
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = skillRouter;
