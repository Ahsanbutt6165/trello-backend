import express from "express";
import boardRoutes from "./routes/boardRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import UserRoutes from "./routes/UserRoutes.js";
import connectToMongo from "./database/db.js";
import CardRoutes from "./routes/CardRoutes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
const app = express();

// Connect to MongoDB
connectToMongo();

// Middleware

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE", // Adjust as needed
    allowedHeaders: "Content-Type,Authorization", // Add more headers if needed
    credentials: true, // If you are using cookies, tokens, etc.
  })
);
const PORT = process.env.PORT || 3000;

// Routes
app.use("/api/user", UserRoutes);
app.use("/api/board", boardRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/card", CardRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Both frontend and backend running on http://localhost:${PORT}`);
});
