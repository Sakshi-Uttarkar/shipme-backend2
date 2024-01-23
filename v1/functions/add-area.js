const { sequelize } = require("../config/db");
const { verifyToken } = require("../middleware/middleware");
const { Area, City, State, Country } = require("../config/databaseModels");
const {
  successResponse,
  errorResponse,
} = require("../constants/replyResponse");

module.exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);
  const header = event.headers;

  if (header.authorization == undefined) {
    return errorResponse("No token found in header !!");
  }

  const [bearer, token] = header.authorization.split(" ");
  const decoded = verifyToken(token);
  await sequelize.sync();

  if (decoded.userRole === "admin") {
    const city_id = body.city_id;
    console.log(body);
    const name = body.name;
    const isactive = body.isactive;

    const query = `
      INSERT INTO area (city_id,name, isactive)
      VALUES (${city_id},'${name}',${isactive});
    `;

    const areas = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });

    return successResponse(areas);
  }
};
