import express from "express";
import { getAllSensors } from "../controllers/sensorController.js";

const router = express.Router();

router.get("/", getAllSensors);
// Define other routes similarly...

export default router;
