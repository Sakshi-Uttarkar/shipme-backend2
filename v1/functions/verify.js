const { sequelize } = require('../config/db.js');
const { User } = require('../config/databaseModels.js');
const { successResponse, errorResponse } = require('../constants/replyResponse.js');

module.exports.handler = async (event, context) => {
    const body = JSON.parse(event.body);
    const token = body.verificationToken;
    console.log(token);
    if (!token) {
        return errorResponse('Token not provided.');
    }
    await sequelize.authenticate();

    try {
        const user = await User.findOne({
            where: { verificationToken: token },
        });

        if (!user) {
            return errorResponse('Invalid or expired token.');
        }
        user.isVerified = true;
        user.verificationToken = null;
        await user.save();

        return successResponse('Email verification successful.');
    } catch (error) {
        return errorResponse(error.message);
    }
};
