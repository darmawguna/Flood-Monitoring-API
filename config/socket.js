import { Server } from "socket.io";

export default (server) => {
  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log("New client connected");

    // Emit data to the client
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });

  return io;
};
