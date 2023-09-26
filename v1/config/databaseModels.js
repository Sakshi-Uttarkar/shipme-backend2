const { Sequelize } = require('sequelize');
const {sequelize } = require('./db')
const User = sequelize.define('user', {
    
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userRole: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      contactNumber: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      verificationToken : {
        type:Sequelize.STRING, 
        allowNull: true

      }, 
      isVerified : {
        type: Sequelize.BOOLEAN,
        allowNull:true
      },
  });

  module.exports = { User };
