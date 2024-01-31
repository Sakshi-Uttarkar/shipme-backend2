const { sequelize } = require("../config/db");
const { Area } = require("../config/databaseModels");
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
  const [bearer, token] = header?.authorization.split(" ");
  const decoded = verifyToken(token);
  const body = JSON.parse(event.body);
  console.log(body);
  if (decoded.userRole === "admin") {
    const updateData = {
      name: body.areaName,
    };
    const res = await Area.update(updateData, {
      where: {
        area_id: body.areaId,
      },
    });
    if (res) {
      return successResponse("The area details updated successfully");
    } else {
      return errorResponse(
        "Error while updating... Please contact Backend Developer!"
      );
    }
  } else {
    return errorResponse("You are not authorized to access this endpoint.");
  }
};
