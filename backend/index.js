import express from "express";
import cors from "cors";
import { initializeApp, cert } from "firebase-admin/app";
import fs from "fs";
import dotenv from "dotenv";

import { connectDB } from "./src/config/db.js";
import userRoutes from "./src/routes/userRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const serviceAccount = JSON.parse(
  fs.readFileSync(new URL("./serviceAccountKey.json", import.meta.url))
);

initializeApp({
  credential: cert(serviceAccount),
});

app.use("/api", userRoutes);

try {
  await connectDB();
  app.listen(5000, () => console.log("Server running"));
} catch (err) {
  console.error("Startup failed:", err.message);
  process.exit(1);
}