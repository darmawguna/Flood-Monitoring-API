import WaterLevel from "../models/waterlevel.js";
import createResponse from "../utils/responseFormat.js";
import { waterLevelsNamespace } from "../sockets/waterLevelSocket.js";
import Sensor from "../models/sensor.js";
export const createWaterLevel = async (req, res) => {
  const newWaterLevel = req.body;

  // Validate request body
  if (!newWaterLevel.sensor_id || !newWaterLevel.timestamp || !newWaterLevel.water_level) {
    return res.status(400).json(createResponse("All fields are required"));
  }

  try {
    const sensorData = await Sensor.getById(newWaterLevel.sensor_id);

    // Menangani jika sensorData kosong atau tidak valid
    if (!sensorData || sensorData.length === 0) {
      return res.status(404).json(createResponse("Sensor data not found"));
    }

    // Konversi timestamp ke objek Date
    const waterLevelDate = new Date(newWaterLevel.timestamp);

    const combinedData = {
      location: sensorData[0].location,
      water_level: newWaterLevel.water_level,
      timestamp: waterLevelDate,
    };

    const insertId = await WaterLevel.create(newWaterLevel);
    res.status(201).json(createResponse("Water Level created successfully", { WaterId: insertId }));
    // Emit data to WebSocket clients
    console.log("Emitting new water level data to clients:", combinedData);
    waterLevelsNamespace.emit("water-level", combinedData);
  } catch (err) {
    console.error("Error creating water level:", err); // Log error for debugging
    res.status(500).json(createResponse("Error creating water level", err.message));
  }
};
