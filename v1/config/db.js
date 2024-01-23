const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  database: "shipmedb",
  username: "shipmeuser",
  password: "shipme123",
  host: "localhost",
  port: 5432,
  dialect: "postgres",
});

module.exports = { sequelize };
