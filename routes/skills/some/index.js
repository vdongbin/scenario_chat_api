const stageHandlers = {
  launch: require('./handler/launchHandler'),
  intent: require('./handler/intentHandler'),
  input: require('./handler/inputHandler'),
  choice: require('./handler/choiceHandler'),
  review: require('./handler/reviewHandler')
};

const controller = (req, res) => {
  try {
    const { skill, action_type, answer } = req.body;
    const stageHandler = stageHandlers[action_type];
    if (stageHandler) {
      return stageHandler(skill, action_type, answer);
    } else {
      return Promise.resolve({ error: 'Invalid action_type' });
    }
  } catch (err) {
    return Promise.reject(err);
  }
};

module.exports = controller;
