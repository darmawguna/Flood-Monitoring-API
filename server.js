import server from "./app.js";
import { initWaterLevelWebSocket } from "./sockets/waterLevelSocket.js";
initWaterLevelWebSocket(server);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
