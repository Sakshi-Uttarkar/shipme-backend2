const { sequelize } = require("../config/db");
const { User } = require("../config/databaseModels");
const {
    successResponse,
    errorResponse,
} = require("../constants/replyResponse");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../middleware/middleware");
const fs = require("fs");

module.exports.handler = async (event, context) => {
    const header = event.headers;
    if (header.authorization == undefined) {
        return errorResponse('No token found in header !!');
    }
    const [bearer, token] = header?.authorization.split(" ");
    const decoded = verifyToken(token);
    await sequelize.sync();

    if (decoded.userRole === 'admin') {
        const query = await User.findAll({
            attributes: [
                "id",
                "firstName",
                "lastName",
                "city",
                "gender",
                "email",
                "contactNumber",
                "updatedAt",
            ],
            where: {
                userRole: "user",
            },
        });

        return successResponse(query);
    } else {
        return errorResponse('You are not authorized to access this endpoint.');
    }
};
