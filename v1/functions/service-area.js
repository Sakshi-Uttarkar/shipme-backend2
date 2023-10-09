const { sequelize } = require('../config/db');
const { Service_Area } = require('../config/databaseModels');
const { successResponse, errorResponse } = require('../constants/replyResponse');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../middleware/middleware');
const fs = require('fs');


module.exports.handler = async (event, context) => {
    const area = await Service_Area.findAll();
    return successResponse(area);
};
