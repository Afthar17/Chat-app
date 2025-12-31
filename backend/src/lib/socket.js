import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

// userId -> Set of socketIds
const userSocketMap = new Map();

// helper for messaging
export const getReceiverSocketId = (userId) => {
  const sockets = userSocketMap.get(userId);
  if (!sockets || sockets.size === 0) return null;
  // return any one socket (or loop if needed)
  return [...sockets][0];
};

io.on("connection", (socket) => {
  const { userId } = socket.handshake.query;

  if (!userId) {
    socket.disconnect();
    return;
  }

  // add socket
  if (!userSocketMap.has(userId)) {
    userSocketMap.set(userId, new Set());
  }
  userSocketMap.get(userId).add(socket.id);

  io.emit("getOnlineUsers", [...userSocketMap.keys()]);

  socket.on("disconnect", () => {
    const sockets = userSocketMap.get(userId);

    if (sockets) {
      sockets.delete(socket.id);
      if (sockets.size === 0) {
        userSocketMap.delete(userId);
      }
    }

    io.emit("getOnlineUsers", [...userSocketMap.keys()]);
  });
});

export { app, server, io };
