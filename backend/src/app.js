require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");

const aiRoutes = require("./routes/ai.routes");

const app = express();

// CORS setup
app.use(
  cors({
    origin: ["http://localhost:5173", "https://your-frontend-domain.com"], // Replace with your frontend domain
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// API routes
app.use("/ai", aiRoutes);

// Serve frontend in production
const __dirname1 = path.resolve(__dirname, "../.."); // go from src → backend → code-review

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "frontend", "dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname1, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

module.exports = app;
