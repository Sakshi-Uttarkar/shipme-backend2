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
    if (decoded.userRole === 'admin') {
        const existingUser = await User.findByPk(body.id);
        if (!existingUser) {
            return errorResponse("User not found", 404);
        }
        const updateData = {
            firstName: body.firstName,
            lastName: body.lastName,
            city: body.city,
            gender: body.gender,
            email: body.email,
            contactNumber: body.contactNumber,
        };
        const res = await User.update(updateData, {
            where: {
                id: body.id
            },
        });
        if (res) {
            return successResponse("The use details updated successfully");
        } else {
            return errorResponse('Error while updating... Please contact Backend Developer !');


        }
    } else {
        return errorResponse('You are not authorized to access this endpoint.');

    }
};
