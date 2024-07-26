import db from "../config/db.js";

export const getAllWaterLevels = (req, res) => {
  db.query("SELECT * FROM WaterLevel", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
     res.json(createResponse("Waterlevels fetched successfully ", results, 200));
  });
};

export const getSelectedWaterLevel = (req, res) => {
  db.query("SELECT * FROM WaterLevel WHERE id = ?", [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
     res.json(createResponse("Waterlevel successfully founded ", results, 200));
  });
};

// Implement other controller methods similarly...
