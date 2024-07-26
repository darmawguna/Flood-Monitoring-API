import express from "express";
import { getAllWaterLevels } from "../controllers/waterlevelController.js";

const router = express.Router();

router.get("/", getAllWaterLevels);
// Define other routes similarly...

export default router;
