const { sequelize } = require('../config/db.js');
const {User} = require('../config/databaseModels.js'); // Adjust the path as needed
const { successResponse, errorResponse } = require('../constants/replyResponse.js');
const jwt = require('jsonwebtoken');
module.exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);
    await sequelize.authenticate();
    try {
        const user = await User.findOne({
            where: { email: body.email },
        });
        if (!user) {
            return errorResponse('User not found.');
        }
        if (!user.isVerified) {
            return errorResponse('Email address is not verified.');
        }

        console.log(user.password);
        console.log('///');
        console.log(body.password);
        // const isPasswordValid = await bcrypt.compare();

        if (body.password !== user.password) {
            return errorResponse('Invalid password.');
        }
        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email,
            },
            'aslkdaslKJkldjkKJkljsklfjlksdaskdjeopfsg55asdLKLkalskd', 
            { expiresIn: '3d' } 
        );
        return successResponse({ token });
    } catch (error) {
        return errorResponse(error.message);
    }
};
