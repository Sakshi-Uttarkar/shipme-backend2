const { sequelize } = require("../config/db");
const { Category } = require("../config/databaseModels");
const {
  successResponse,
  errorResponse,
} = require("../constants/replyResponse");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../middleware/middleware");
const fs = require("fs");
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const uuid = require("uuid");

module.exports.handler = async (event, context) => {
  const header = event.headers;
  if (header.authorization == undefined) {
    return errorResponse("No token found in header !!");
  }
  const [bearer, token] = header?.authorization.split(" ");
  const decoded = verifyToken(token);
  await sequelize.sync();

  if (decoded.userRole === "admin") {
    try {
      const s3 = new AWS.S3();
      let filename = "";
      const upload = multer({
        storage: multerS3({
          s3: s3,
          bucket: "category",
          acl: "public-read",
          key: function (req, file, cb) {
            filename = `${uuid.v4()}_${file.originalname}`;
            cb(null, `function/upload/${filename}`);
          },
        }),
      });
      console.log(filename, "hbhbhhhhhhhh");
      Category.create({
        categoryName: "Sample Category",
        isActive: true,
        imagePath: filename,
        title: "Sample Title",
        content: "Sample Content",
      });
      //s3 bucket configuration needed
      //add file upload appear here
      return successResponse("Category added successfully");
    } catch (error) {
      return errorResponse("Error adding category: " + error.message);
    }
  } else {
    return errorResponse("You are not authorized to access this endpoint.");
  }
};
