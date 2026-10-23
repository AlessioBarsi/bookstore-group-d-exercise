import "dotenv/config";
import express from "express";
import cors from "cors";
import { auth } from "./auth/auth.js";
import { toNodeHandler } from "better-auth/node";

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use("/uploads", express.static("uploads"));
app.use("/api/auth", toNodeHandler(auth));

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));