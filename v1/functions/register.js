const { sequelize } = require('../config/db.js');
const { User } = require('../config/databaseModels.js');
const { successResponse, errorResponse } = require('../constants/replyResponse.js');
const {generateVerificationToken } = require('../constants/commonFunctions.js')
module.exports.handler = async (event, context) => {
    const body = JSON.parse(event.body);
    await sequelize.authenticate();
    try {
        await sequelize.sync();
        const existingUserWithEmail = await User.findOne({
            where: { email: body.email },
        });
        if (existingUserWithEmail) {
            return errorResponse('Email address is already in use.');
        }
        const existingUserWithContactNumber = await User.findOne({
            where: { contactNumber: body.contactNumber },
        });

        if (existingUserWithContactNumber) {
            return errorResponse('Contact number is already in use.');
        }
        const verificationToken = generateVerificationToken();
        await User.create({
            firstName: body.firstName,
            lastName: body.lastName,
            city: body.city,
            gender: body.gender,
            email: body.email,
            password: body.password,
            userRole: "user",
            contactNumber: body.contactNumber,
            verificationToken: verificationToken, 
            isVerified: false,
        });
        const verificationLink = { verificationToken:  verificationToken};
        return successResponse(verificationLink);
    } catch (error) {
        return errorResponse(error.message);
    }
};

