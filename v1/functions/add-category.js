const { sequelize } = require('../config/db');
const { Category } = require('../config/databaseModels');
const { successResponse, errorResponse } = require('../constants/replyResponse');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../middleware/middleware');
const fs = require('fs');


module.exports.handler = async (event, context) => {
    const header = event.headers;
    const [bearer, token] = header?.authorization.split(" ");
    const decoded = verifyToken(token);
    await sequelize.sync();

    if (decoded.userRole === 'admin') {
        try {
            Category.create({
                categoryName: 'Sample Category',
                isActive: true,
                imagePath: 'https://ik.imagekit.io/dunzo/home/tr:w-488,h-360_home_icon/operator-FFWUCfzmUzhok89HMYt0ON2Gy5oZECO73gRenPw11HxAeCLBtTBOG8FMqMTe92UOnScOPMUnjYDcaPVxx7wSFJwXJ3kSR3YRsPby4EgC4zW2mVYLc99zuvVh7O2Ppmx2QMQd40UiwYLGhy0OjbMayr.png',
                title: 'Sample Title',
                content: 'Sample Content',
            })
            //s3 bucket configuration needed
            //add file upload appear here
            return successResponse('Category added successfully');
        } catch (error) {
            return errorResponse('Error adding category: ' + error.message);
        }
    } else {
        return errorResponse('You are not authorized to access this endpoint.');
    }
};
