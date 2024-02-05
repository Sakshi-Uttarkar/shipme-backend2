const { sequelize } = require("../config/db");
const { Area } = require("../config/databaseModels");
const {
  successResponse,
  errorResponse,
} = require("../constants/replyResponse");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../middleware/middleware");
const fs = require("fs");

const deleteAreaHandler = async (event, headers) => {
  const body = event;
  const header = headers;

  if (header.authorization == undefined) {
    return errorResponse("No token found in header !!");
  }
  const [bearer, token] = header?.authorization.split(" ");
  const decoded = verifyToken(token);
  // const body = JSON.parse(event.body);
  const area_id = body.area_id;

  if (decoded.userRole === "admin") {
    try {
      const existingUser = await Area.findByPk(area_id);

      if (!existingUser) {
        return errorResponse("Area not found", 404);
      }
      await existingUser.destroy();

      return successResponse("Area deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      return errorResponse("Internal Server Error", 500);
    }
  } else {
    return errorResponse("You are not authorized to access this endpoint.");
  }
};

module.exports = { deleteAreaHandler };
