import db from "../config/db.js";

const User = {
  getAll: async () => {
    try {
      const result = await new Promise((resolve, reject) => {
        db.query("SELECT * FROM user", (err, results) => {
          if (err) return reject(err);
          resolve(results);
        });
      });
      return result;
    } catch (err) {
      throw new Error("Error fetching user: " + err.message);
    }
  },
  getById: async (id) => {
    if (!id) throw new Error("User ID is required");
    try {
      const results = await new Promise((resolve, reject) => {
        db.query("SELECT * FROM user WHERE user_id = ?", [id], (err, results) => {
          if (err) return reject(err);
          resolve(results[0]);
        });
      });
      return results;
    } catch (err) {
      throw new Error("Error fetching alert: " + err.message);
    }
  },
  create: async (newUser) => {
    try {
      const insertId = await new Promise((resolve, reject) => {
        db.query("INSERT INTO user SET ?", newUser, (err, results) => {
          if (err) return reject(err);
          console.log(results.insertId);
          resolve(results.insertId);
        });
      });
      return insertId;
    } catch (err) {
      throw new Error("Error creating user: " + err.message);
    }
  },
  update: async (id, updateUser) => {
    if (!id) throw new Error("Sensor ID is required");
    try {
      const results = await new Promise((resolve, reject) => {
        db.query("UPDATE user SET ? WHERE user_id = ?", [updateUser, id], (err, results) => {
          if (err) return reject(err);
          console.log(results);
          resolve(results);
        });
      });
      return id;
    } catch (err) {
      throw new Error("Error updating user: " + err.message);
    }
  },
  delete: async (id) => {
    if (!id) throw new Error("User ID is required");
    try {
      const results = await new Promise((resolve, reject) => {
        db.query("DELETE FROM user WHERE user_id = ?", [id], (err, results) => {
          if (err) return reject(err);
          resolve(results);
        });
      });
      return results;
    } catch (err) {
      throw new Error("Error deleting user: " + err.message);
    }
  },
};

export default User;
