const { Stage, Message } = require('../../../../models');

const launchHandler = async (skill, action_type) => {
  try {
    const skill_id = skill.id;

    const stage = await Stage.findOne({
      where: {
        skill_id
      }
    });
    const message = await Message.findAll({
      where: {
        stage_id: stage.id
      },
      attributes: ['type', 'contents']
    });

    const response = {
      action_type: 'intent',
      message,
      skill
    };
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
};

module.exports = launchHandler;
