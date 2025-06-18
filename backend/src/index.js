import express from "express";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./lib/socket.js";
import path from "path";

dotenv.config();

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, // This is important for sending cookies with requests
};

app.use(cors(corsOptions));

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // Match any route not starting with /api

  //in version 5 of express path to regrex couldnt work on wildcard routes so use normal javascript regrex
  //   app.get(/^\/(?!api).*/, (req, res) => {
  //     res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
  //   });

  app.get("*", (req, res, next) => {
    // Skip API routes
    if (req.originalUrl.startsWith("/api")) return next();

    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    console.log(__dirname);
  });
}

server.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
  connectDB();
});
