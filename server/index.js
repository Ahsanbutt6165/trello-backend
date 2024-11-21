import express from "express";
import boardRoutes from "./routes/BoardRoutes.js";
import taskRoutes from "./routes/TaskRoutes.js";
import userRoutes from "./routes/UserRoutes.js";
import connectToMongo from "./database/db.js";
import cardRoutes from "./routes/CardRoutes.js";
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
    origin: "http://localhost:5173", // Allow requests from your frontend
    methods: ["GET", "POST", "PUT", "DELETE"], // List allowed HTTP methods
    credentials: true, // Allow cookies and credentials
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"], // Add necessary headers
  })
);

app.options("*", cors()); // Allow preflight requests for all routes

const PORT = process.env.PORT || 3000;

// Routes
app.use("/api/user", userRoutes);
app.use("/api/board", boardRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/card", cardRoutes);
app.get("/", async (req, res) => {
  res.send("working");
});
// Start the server
app.listen(PORT, () => {
  console.log(`Both frontend and backend running on http://localhost:${PORT}`);
});
