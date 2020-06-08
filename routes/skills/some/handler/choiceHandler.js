const { Stage, Message, Card, Interpretation } = require('../../../../models');

const choiceHandler = async (skill, action_type, answer) => {
  try {
    const { id } = skill;
    const { choice } = answer;

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

    const interpretation = await Interpretation.findOne({
      where: {
        card_id: choice.card_id,
        skill_id: id
      },
      attributes: ['id', 'contents'],
      include: {
        model: Card,
        attributes: ['id', 'name', 'image']
      }
    });

    const response = {
      action_type: 'review',
      message,
      skill,
      interpretation
    };
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
};

module.exports = choiceHandler;
