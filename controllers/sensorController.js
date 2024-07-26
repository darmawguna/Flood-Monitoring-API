import db from "../config/db.js";

export const getAllSensors = (req, res) => {
  db.query("SELECT * FROM Sensor", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(createResponse("Sensors fetched successfully", results, 200));
  });
};

export const getSelectedSensor = (req, res) => {
  db.query("SELECT * FROM Sensor WHERE id = ?", [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(createResponse("Sensor successfully founded", results, 200));
  });
};

// Implement other controller methods similarly...
