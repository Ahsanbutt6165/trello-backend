import express from "express";
import BoardRoutes from "./routes/BoardRoutes.js";
import TaskRoutes from "./routes/TaskRoutes.js";
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
    origin: "http://localhost:5173", // Allow requests from your frontend
    methods: ["GET", "POST", "PUT", "DELETE"], // List allowed HTTP methods
    credentials: true, // Allow cookies and credentials
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"], // Add necessary headers
  })
);

app.options("*", cors()); // Allow preflight requests for all routes


const PORT = process.env.PORT || 3000;

// Routes
app.use("/api/user", UserRoutes);
app.use("/api/board", BoardRoutes);
app.use("/api/tasks", TaskRoutes);
app.use("/api/card", CardRoutes);
app.get("/", async (req, res) => {
  res.send("working");
});
// Start the server
app.listen(PORT, () => {
  console.log(`Both frontend and backend running on http://localhost:${PORT}`);
});
