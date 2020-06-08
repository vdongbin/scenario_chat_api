const {
  skills,
  stages,
  messages,
  cards,
  interpretations,
  keywords
} = require('../data');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('skills', skills, {});
    await queryInterface.bulkInsert('stages', stages, {});
    await queryInterface.bulkInsert('messages', messages, {});
    await queryInterface.bulkInsert('cards', cards, {});
    await queryInterface.bulkInsert('interpretations', interpretations, {});
    await queryInterface.bulkInsert('keywords', keywords, {});
  }
};
