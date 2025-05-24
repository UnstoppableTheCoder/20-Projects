import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json()); // Accept JSON data

app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
  // Serve static files from frontend/dist
  app.use(express.static(path.join(__dirname, "frontend", "dist")));

  // Serve index.html for any other route
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log(`Server started at http://localhost:${PORT}`);
});
