import "dotenv/config";
import express from "express";
import cors from "cors";
import { auth } from "./auth/auth.js";
import { toNodeHandler, fromNodeHeaders } from "better-auth/node";

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use("/uploads", express.static("uploads"));

// Better Auth handler: must come BEFORE express.json()
app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.get("/api/me", async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  if (!session) return res.status(401).json({ error: "Unauthorized" });
  res.json(session);
});


app.listen(3000, () => console.log("Server running on http://localhost:3000"));