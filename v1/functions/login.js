const { sequelize } = require("../config/db.js");
const { User } = require("../config/databaseModels.js");
const {
  successResponse,
  errorResponse,
} = require("../constants/replyResponse.js");
const jwt = require("jsonwebtoken");

const loginHandler = async (event, context) => {
  console.log(event);
  const body = event;
  await sequelize.authenticate();
  try {
    const user = await User.findOne({
      where: { email: body.email },
    });
    if (!user) {
      return errorResponse("User not found.");
    }
    if (!user.isVerified) {
      return errorResponse("Email address is not verified.");
    }

    console.log(user.password);
    console.log("///");
    console.log(body.password);
    // const isPasswordValid = await bcrypt.compare();

    if (body.password !== user.password) {
      return errorResponse("Invalid password.");
    }
    // console.log('===userInfo', user);
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        userRole: user.userRole,
      },
      "aslkdaslKJkldjkKJkljsklfjlksdaskdjeopfsg55asdLKLkalskd",
      { expiresIn: "15d" }
    );
    return successResponse({ token });
  } catch (error) {
    return errorResponse(error.message);
  }
};
module.exports = { loginHandler };
