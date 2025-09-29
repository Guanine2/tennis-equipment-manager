import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Import routers
import racquetsRouter from "./routes/racquets.js";
import brandRouter from "./routes/brand.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(cors());

// Connect routes
app.use("/racquets", racquetsRouter);  // e.g., GET /racquets
app.use("/brand", brandRouter);        // e.g., GET /brand

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
