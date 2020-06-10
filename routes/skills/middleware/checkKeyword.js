const { Keyword, Skill } = require('../../../models');

const checkKeyword = async (req, res, next) => {
  try {
    const { message } = req.body;
    if (!message) {
      // if message was not existed, just next
      next();
    } else {
      // if message was existed, check keyword
      const keyword = await Keyword.findOne({
        include: [
          {
            model: Skill,
            attributes: ['id', 'name', 'initial_stage']
          }
        ],
        where: { keyword: message },
        attributes: ['skill_id']
      });

      if (keyword) {
        // if matched keyword was existed, change req.body
        const skill = {
          id: keyword.skill_id,
          name: keyword.skill.name
        };
        const action_type = keyword.skill.initial_stage;

        req.body.skill = skill;
        req.body.action_type = action_type;
        next();
      } else {
        // handle fallback
        const response = {
          action_type: null,
          skill: null,
          message: [
            {
              type: 'text',
              contents: '하트코행성 여행자 메뉴에서 원하는 스킬을 선택해봐'
            }
          ]
        };
        return res.send(response);
      }
    }
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};

module.exports = checkKeyword;
