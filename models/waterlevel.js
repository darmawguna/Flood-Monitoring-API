import db from "../config/db.js";

const WaterLevel = {
  create: async (newWaterLevelData) => {
    try {
      const insertId = await new Promise((resolve, reject) => {
        db.query("INSERT INTO waterlevel SET ?", newWaterLevelData, (err, results) => {
          if (err) return reject(err);
          resolve(results.insertId);
        });
      });
      return insertId;
    } catch (err) {
      throw new Error("Error creating waterlevel Data: " + err.message);
    }
  },

  getWaterLevelWithSensorLocation: async (sensorId) => {
    try {
      const query = `
        SELECT
          wl.timestamp,
          wl.water_level,
          s.location AS sensor_location
        FROM
          waterlevel wl
        JOIN
          sensor s ON wl.sensor_id = s.id
        WHERE
          wl.sensor_id = ?
        ORDER BY
          wl.timestamp DESC;
      `;

      const results = await new Promise((resolve, reject) => {
        db.query(query, [sensorId], (err, results) => {
          if (err) return reject(err);
          resolve(results);
        });
      });

      return results;
    } catch (err) {
      throw new Error("Error retrieving water level data: " + err.message);
    }
  },
};

export default WaterLevel;
