const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[
  env
];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Tables
db.Skill = require('./skill')(sequelize, Sequelize);
db.Stage = require('./stage')(sequelize, Sequelize);
db.Message = require('./message')(sequelize, Sequelize);
db.Card = require('./card')(sequelize, Sequelize);
db.Interpretation = require('./interpretation')(sequelize, Sequelize);
db.Review = require('./review')(sequelize, Sequelize);
db.Keyword = require('./keyword')(sequelize, Sequelize);

// Relations
db.Skill.hasMany(db.Stage, {
  foreignKey: 'skill_id',
  sourceKey: 'id'
});
db.Stage.belongsTo(db.Skill, {
  foreignKey: 'skill_id',
  targetKey: 'id'
});

db.Stage.hasMany(db.Message, {
  foreignKey: 'stage_id',
  sourceKey: 'id'
});
db.Message.belongsTo(db.Stage, {
  foreignKey: 'stage_id',
  targetKey: 'id'
});

db.Card.hasMany(db.Interpretation, {
  foreignKey: 'card_id',
  sourceKey: 'id'
});
db.Interpretation.belongsTo(db.Card, {
  foreignKey: 'card_id',
  targetKey: 'id'
});

db.Skill.hasMany(db.Interpretation, {
  foreignKey: 'skill_id',
  sourceKey: 'id'
});
db.Interpretation.belongsTo(db.Skill, {
  foreignKey: 'skill_id',
  targetKey: 'id'
});

db.Skill.hasMany(db.Review, {
  foreignKey: 'skill_id',
  sourceKey: 'id'
});
db.Review.belongsTo(db.Skill, {
  foreignKey: 'skill_id',
  targetKey: 'id',
  onDelete: 'cascade'
});

db.Skill.hasMany(db.Keyword, {
  foreignKey: 'skill_id',
  sourceKey: 'id',
  onDelete: 'cascade'
});
db.Keyword.belongsTo(db.Skill, {
  foreignKey: 'skill_id',
  targetKey: 'id',
  onDelete: 'cascade'
});

module.exports = db;
