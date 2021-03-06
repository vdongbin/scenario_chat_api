const { Stage, Message, Review } = require('../../../../models');

const reviewHandler = async (skill, action_type, answer) => {
  try {
    const { id } = skill;
    const { review } = answer;

    if (typeof review !== 'string' || review.length === 0) {
      return Promise.resolve({ error: 'Invalid review' });
    }

    // add review
    await Review.create({
      skill_id: id,
      contents: review
    });

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
      action_type: null,
      message,
      skill: null
    };
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
};

module.exports = reviewHandler;
