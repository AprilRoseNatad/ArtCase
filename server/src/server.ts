import express from "express";
import cors from "cors";
import "dotenv/config";
import "./config/cloudinary.js";
import "./config/firebase.js";
import authRoutes from "./routes/auth.routes.js";
import artworkRoutes from "./routes/artwork.routes.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "10kb" }));

app.use("/auth", authRoutes);
app.use("/artworks", artworkRoutes);

app.get("/", (req, res) => {
  res.send("ArtCase API is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});