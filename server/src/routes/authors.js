import { Router } from "express";
import { db } from "../db/index.js";
import { author } from "../db/schema.js";

const router = Router();

router.get("/", async (req, res) => {
  const authors = await db
    .select({
      id: author.id,
      name: author.name,
      birthDate: author.birthDate,
    })
    .from(author)
    .orderBy(author.name);

  res.json(authors);
});

export default router;