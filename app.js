import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
import sensorRoutes from "./routes/sensorRoutes.js";
import waterLevelRoutes from "./routes/waterlevelRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import alertRoutes from "./routes/alertRoutes.js";

app.use("/sensors", sensorRoutes);
app.use("/waterlevels", waterLevelRoutes);
app.use("/users", userRoutes);
app.use("/alerts", alertRoutes);

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

export default app;
