import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import notesRouter from "./routes/notes.js";

// 1. Configuration
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/keeper";

// 2. Middleware
app.use(cors());
app.use(express.json());

// 3. Routes
app.use("/api/notes", notesRouter);

// 4. Database Connection & Server Start
async function startServer() {
  try {
    // Attempt connection with recommended options for reliability
    await mongoose.connect(mongoUri);
    console.log("✅ MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    // Exit the process if the database is required to function
    process.exit(1);
  }
}

startServer();
