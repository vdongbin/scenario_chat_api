const { Keyword, Skill } = require('../../../models');

const checkKeyword = async (req, res, next) => {
  try {
    const { message } = req.body;
    if (!message) {
      next();
    } else {
      const keyword = await Keyword.findOne({
        include: [
          {
            model: Skill,
            attributes: ['id', 'router', 'initial_stage']
          }
        ],
        where: { keyword: message },
        attributes: ['skill_id']
      });
      if (keyword) {
        const skill = {
          id: keyword.skill_id,
          name: keyword.skill.router
        };
        const action_type = keyword.skill.initial_stage;

        req.body.skill = skill;
        req.body.action_type = action_type;
        next();
      } else {
        return res.send({ message: message, answer: '아무 노래나 춤 춰' });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

module.exports = checkKeyword;
