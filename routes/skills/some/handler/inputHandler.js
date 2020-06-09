const { Stage, Message, Card } = require('../../../../models');
const _ = require('lodash');

const inputHandler = async (skill, action_type, answer) => {
  try {
    const { id } = skill;
    const { input } = answer;

    // get stage_id
    const stage = await Stage.findOne({
      where: {
        skill_id: id,
        name: action_type
      }
    });

    // get cards and shuffle
    const card = await Card.findAll({
      attributes: ['id', 'name']
    });
    const suffled = _.shuffle(card);

    // get message and replace $ to input
    const message = await Message.findAll({
      where: {
        stage_id: stage.id
      },
      attributes: ['type', 'contents']
    });
    const changedMessage = message.map((e) => {
      if (e.type === 'text') {
        e.contents = e.contents.replace(/\$/gi, input);
      }
      return e;
    });

    const response = {
      action_type: 'choice',
      message: changedMessage,
      skill,
      card: suffled
    };
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject({ error: err.message });
  }
};

module.exports = inputHandler;
