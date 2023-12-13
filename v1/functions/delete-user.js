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
    const body = JSON.parse(event.body);
    const userId = body.id;

    if (decoded.userRole === 'admin') {

        try {
            const existingUser = await User.findByPk(userId);

            if (!existingUser) {
                return errorResponse("User not found", 404);
            }
            await existingUser.destroy();

            return successResponse("User deleted successfully");
        } catch (error) {
            console.error("Error deleting user:", error);
            return errorResponse("Internal Server Error", 500);
        }
    } else {
        return errorResponse('You are not authorized to access this endpoint.');

    }
};
