import { Server as WebSocketServer } from "socket.io";

export let waterLevelsNamespace; // Untuk menyimpan namespace

export function initWaterLevelWebSocket(server) {
  const io = new WebSocketServer(server, {
    cors: {
      origin: "http://localhost:5173", // Ganti dengan URL frontend Anda
      methods: ["GET", "POST"],
    },
  });

  // Namespace untuk WebSocket di route /water-levels
  waterLevelsNamespace = io.of("/water-levels");

  let connectedClients = 0;

  waterLevelsNamespace.on("connection", (socket) => {
    connectedClients++;
    console.log(`User connected to /water-levels. Total clients: ${connectedClients}`);

    waterLevelsNamespace.emit("clientCount", connectedClients);

    socket.on("disconnect", () => {
      connectedClients--;
      console.log(`User disconnected from /water-levels. Total clients: ${connectedClients}`);
      waterLevelsNamespace.emit("clientCount", connectedClients);
    });

    socket.on("waterLevel", (msg) => {
      console.log("Received water level on /water-levels: " + msg);
      socket.emit("response", "water level received: " + msg);
    });
  });

  return io;
}
