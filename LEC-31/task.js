const { WebSocketServer, WebSocket } = require("ws");

const wss = new WebSocketServer({ port: 8080 });

const rooms = new Map();

wss.on("connection", (socket) => {
  let currentRoom = null;

  socket.on("message", (msg) => {
    try {
      const data = JSON.parse(msg);

      if (data.type === "chat") {
        const message = data.payload.message;

        if (message.startsWith("join:")) {
          const roomName = message.split(":")[1].trim();
          if (currentRoom && rooms.has(currentRoom)) {
            rooms.get(currentRoom).delete(socket);
          }
          if (!rooms.has(roomName)) {
            rooms.set(roomName, new Set());
          }
          rooms.get(roomName).add(socket);
          currentRoom = roomName;

          socket.send(JSON.stringify({
            type: "system",
            payload: { message: `Joined room ${roomName}` }
          }));
        } else {
          if (!currentRoom) {
            socket.send(JSON.stringify({
              type: "error",
              payload: { message: "Join a room first using 'join:roomName'" }
            }));
            return;
          }

          const payload = {
            type: "chat",
            payload: {
              message,
              room: currentRoom
            }
          };

          rooms.get(currentRoom).forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify(payload));
            }
          });
        }
      }
    } catch (err) {
      socket.send(JSON.stringify({
        type: "error",
        payload: { message: "Invalid JSON format" }
      }));
    }
  });

  socket.on("close", () => {
    if (currentRoom && rooms.has(currentRoom)) {
      rooms.get(currentRoom).delete(socket);
    }
  });
});

console.log("WebSocket server running on ws://localhost:8080");
