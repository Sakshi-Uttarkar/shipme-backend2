const { sequelize } = require("../config/db");
const { Service_Area } = require("../config/databaseModels");
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
    return errorResponse("No token found in header !!");
  }
  const body = JSON.parse(event.body);
  const [bearer, token] = header?.authorization.split(" ");
  const decoded = verifyToken(token);
  await sequelize.sync();

  if (decoded.userRole === "admin") {
    try {
      await Service_Area.create({
        country: body.country,
        isActive: body.isActive,
        city: body.city,
        state: body.state,
        area: JSON.stringify(body.area),
      });
      return successResponse("Service area added successfully");
    } catch (error) {
      return errorResponse("Error adding category: " + error.message);
    }
  } else {
    return errorResponse("You are not authorized to access this endpoint.");
  }
};
