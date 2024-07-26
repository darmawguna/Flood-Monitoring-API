import db from "../config/db.js";

const Sensor = {
  getAll: async () => {
    try {
      const result = await new Promise((resolve, reject) => {
        db.query("SELECT * FROM sensor", (err, results) => {
          if (err) return reject(err);
          resolve(results);
        });
      });
    } catch (err) {
      throw new Error("Error fetching sensors: " + err.message);
    }
  },

  getById: async (id) => {
    if (!id) throw new Error("Alert ID is required");
    try {
      const result = await new Promise((resolve, reject) => {
        db.query("SELECT * FROM sensor where sensor_id = ? ", [id], (err, results) => {
          if (err) return reject(err);
          resolve(results);
        });
      });
    } catch (err) {
      throw new Error("Error fetching selected sensor: " + err.message);
    }
  },

  create: async (newSensor) => {
    try {
      const insertId = await new Promise((resolve, reject) => {
        db.query("INSERT INTO sensor SET ?", newSensor, (err, results) => {
          if (err) return reject(err);
          resolve(results.sensor_id);
        });
      });
      return insertId;
    } catch (err) {
      throw new Error("Error creating sensor: " + err.message);
    }
  },
  update: async (id, updateSensor) => {
    if (!id) throw new Error("Sensor ID is required");
    try {
      const results = await new Promise((resolve, reject) => {
        db.query("UPDATE sensor SET ? WHERE sensor_id = ?", [updateSensor, id], (err, results) => {
          if (err) return reject(err);
          resolve(results);
        });
      });
      return results;
    } catch (err) {
      throw new Error("Error updating sensor: " + err.message);
    }
  },
  delete: async (id) => {
    if (!id) throw new Error("Sensor ID is required");
    try {
      const results = await new Promise((resolve, reject) => {
        db.query("DELETE FROM Alert WHERE sensor_id = ?", [id], (err, results) => {
          if (err) return reject(err);
          resolve(results);
        });
      });
      return results;
    } catch (err) {
      throw new Error("Error deleting sensor: " + err.message);
    }
  },
};

export default Sensor;
