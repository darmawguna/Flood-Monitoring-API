import http from "http";
import app from "./app.js";
import socketConfig from "./config/socket.js";

const server = http.createServer(app);
const io = socketConfig(server);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
