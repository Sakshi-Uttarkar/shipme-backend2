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
const Category = sequelize.define('category', {
  categoryName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  imagePath: {
    type: Sequelize.STRING,
  },
  title: {
    type: Sequelize.STRING,
  },
  content: {
    type: Sequelize.TEXT,
  },
});
const Service_Area = sequelize.define('delivery_area', {
  country: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  city: {
    type: Sequelize.STRING,
  },
  area: {
    type: Sequelize.STRING,
  },
});



module.exports = { User, Category, Service_Area };
