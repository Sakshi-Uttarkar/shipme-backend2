const { sequelize } = require('../config/db');
const { Area, City, State, Country } = require('../config/databaseModels');
const { successResponse, errorResponse } = require('../constants/replyResponse');

module.exports.handler = async (event, context) => {
    try {
        const query = `
                SELECT
                    a.area_id,
                    a.name AS area_name,
                    a.city_id,
                    c.name AS city_name,
                    c.state_id,
                    s.name AS state_name,
                    s.country_id,
                    cn.name AS country_name,
                    a.isactive
                FROM
                    area AS a
                JOIN
                    city AS c ON a.city_id = c.city_id
                JOIN
                    state AS s ON c.state_id = s.state_id
                JOIN
                    country AS cn ON s.country_id = cn.country_id;
            `;

        const areas = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });

        return successResponse(areas);
    } catch (error) {
        return errorResponse(error.message);
    }
};
