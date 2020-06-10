const { Stage, Message, Card, Interpretation } = require('../../../../models');

const choiceHandler = async (skill, action_type, answer) => {
  try {
    const { id } = skill;
    const { choice, input } = answer;

    if (!choice || input.length === 0 || typeof input !== 'string') {
      return Promise.resolve({ error: 'Invalid choice or input' });
    }

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

    // get interpretation and replace $ to input
    const interpretation = await Interpretation.findOne({
      where: {
        card_id: parseInt(choice),
        skill_id: id
      },
      attributes: ['id', 'contents'],
      include: {
        model: Card,
        attributes: ['id', 'name', 'image']
      }
    });
    interpretation.contents = interpretation.contents.replace(/\$/gi, input);

    const response = {
      action_type: 'review',
      message,
      skill,
      interpretation
    };
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject({ error: err.message });
  }
};

module.exports = choiceHandler;
