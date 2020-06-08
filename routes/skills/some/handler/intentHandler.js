const { Stage, Message } = require('../../../../models');

const intentHandler = async (skill, action_type, answer) => {
  try {
    const { id } = skill;
    const { intent } = answer;

    if (!intent) {
      const response = {
        action_type: 'fallback'
      };
      return Promise.resolve(response);
    }

    const stage = await Stage.findOne({
      where: {
        skill_id: id,
        name: action_type
      }
    });

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
  } catch (err) {
    return Promise.reject(err);
  }
};

module.exports = intentHandler;
