const handlers = {
  launch: require('./handler/launchHandler'),
  intent: require('./handler/intentHandler'),
  input: require('./handler/inputHandler'),
  choice: require('./handler/choiceHandler'),
  interpretation: require('./handler/interpretationHandler'),
  review: require('./handler/reviewHandler')
};

const controller = (req, res) => {
  try {
    const { skill, action_type } = req.body;
    const handler = handlers[action_type];
    if (handler) {
      return handler(skill, action_type);
    } else {
      return Promise.reject({ error: 'Invalid action_type' });
    }
  } catch (err) {
    return Promise.reject(err);
  }
};

module.exports = controller;