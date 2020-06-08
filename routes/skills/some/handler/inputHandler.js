const { Stage, Message, Card } = require('../../../../models');
const _ = require('lodash');

const inputHandler = async (skill, action_type, answer) => {
  try {
    const { id } = skill;
    const { input } = answer;
    console.log(input);

    const stage = await Stage.findOne({
      where: {
        skill_id: id,
        name: action_type
      }
    });

    // get cards and shuffle
    let card = await Card.findAll({
      attributes: ['id', 'name']
    });
    card = _.shuffle(card);

    const message = await Message.findAll({
      where: {
        stage_id: stage.id
      },
      attributes: ['type', 'contents']
    });

    const response = {
      action_type: 'choice',
      message,
      skill,
      card
    };
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
};

module.exports = inputHandler;
