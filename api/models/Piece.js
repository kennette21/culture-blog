const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

class Piece extends Model {}

Piece.init({
  name: DataTypes.STRING,
  media: DataTypes.STRING,
}, { sequelize, modelName: 'piece' });