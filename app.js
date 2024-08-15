import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

// Daftar asal (origin) yang diizinkan
const allowedOrigins = [
  // 'https://example.com', // Aplikasi Web
  "http://localhost:5173", // Aplikasi Web saat pengembangan
  // TODO tambahkan alamat ip untuk laptop klien kgeo
  "http://192.168.100.126:5173", // alamat IP laptop Nanda
  "http://192.168.100.126", // alamat IP laptop klien
  "https://idx.google.com/client-testing-1607078", // alamat Project IDX
  // 'capacitor://localhost', // Aplikasi Mobile dengan Capacitor
  // 'ionic://localhost', // Aplikasi Mobile dengan Ionic
  // 'file://' // Aplikasi Mobile yang diakses dari file lokal
];

// Opsi CORS
const corsOptions = {
  origin: (origin, callback) => {
    // Memeriksa apakah asal (origin) termasuk dalam daftar yang diizinkan
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
};

// Gunakan middleware CORS dengan opsi yang disesuaikan
app.use(cors(corsOptions));

// Middleware
app.use(bodyParser.json());

// Routes
import sensorRoutes from "./routes/sensorRoutes.js";
import waterLevelRoutes from "./routes/waterlevelRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import alertRoutes from "./routes/alertRoutes.js";
// TODO update routes dengan prefix /api
app.use("/sensors", sensorRoutes);
app.use("/users", userRoutes);
app.use("/alerts", alertRoutes);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

export default app;
