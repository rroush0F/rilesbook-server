const Sequelize = require('sequelize');

const sequelize = new Sequelize("postgres://postgres:1ce792d2e7de4516b8f44830b1f9fd86@localhost:5432/RilesBookServer");

module.exports = sequelize;