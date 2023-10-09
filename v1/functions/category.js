const { sequelize } = require('../config/db');
const { Category } = require('../config/databaseModels');
const { successResponse, errorResponse } = require('../constants/replyResponse');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../middleware/middleware');
const fs = require('fs');


module.exports.handler = async (event, context) => {
    const categories = await Category.findAll();
    return successResponse(categories);
};
