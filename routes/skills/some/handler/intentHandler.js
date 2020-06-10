const { Stage, Message } = require('../../../../models');

const intentHandler = async (skill, action_type, answer) => {
  try {
    const { id } = skill;
    const { intent } = answer;
    // intent check, intent should be true or false
    if (intent === false) {
      // handle fallback
      const response = {
        action_type: 'fallback',
        skill: null,
        message: [
          {
            type: 'text',
            contents: '알겠어. 하트코행성 여행자 언제든지 다시 물어보렴.'
          }
        ]
      };
      return Promise.resolve(response);
    } else if (intent === true) {
      // get stage_id
      const stage = await Stage.findOne({
        where: {
          skill_id: id,
          name: action_type
        }
      });
      // get message
      const message = await Message.findAll({
        where: {
          stage_id: stage.id
        },
        attributes: ['type', 'contents']
      });

      const response = {
        action_type: 'input',
        message,
        skill
      };
      return Promise.resolve(response);
    } else {
      // handle error
      return Promise.resolve({ error: 'Invalid intent' });
    }
  } catch (err) {
    return Promise.reject({ error: err.message });
  }
};

module.exports = intentHandler;
