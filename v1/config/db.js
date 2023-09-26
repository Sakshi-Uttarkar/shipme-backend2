const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  database: "shipme",
  username: "shipme",
  password: "shipme",
  host: "localhost",
  port: 5432,
  dialect: 'postgres',
});



module.exports = { sequelize };
