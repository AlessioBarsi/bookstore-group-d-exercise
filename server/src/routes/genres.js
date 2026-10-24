import { Router } from "express";
import { db } from "../db/index.js";
import { genre } from "../db/schema.js";

const router = Router();

router.get("/", async (req, res) => {
  const genres = await db
    .select({
      id: genre.id,
      name: genre.name,
    })
    .from(genre)
    .orderBy(genre.name);

  res.json(genres);
});

export default router;