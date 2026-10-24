import { Router } from "express";
import { and, eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { favoriteBooks, book } from "../db/schema.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { z } from "zod";
import { validate } from "../middleware/validate.js";

const router = Router();
router.use(requireAuth);

router.get("/", async (req, res) => {
  const rows = await db
    .select({ book })
    .from(favoriteBooks)
    .innerJoin(book, eq(favoriteBooks.bookId, book.id))
    .where(eq(favoriteBooks.userId, req.user.id));
  res.json(rows.map((r) => r.book));
});

const bookIdParams = z.object({ bookId: z.uuid() });

router.post("/:bookId", validate({ params: bookIdParams }), async (req, res) => {
  const { bookId } = req.valid.params;
  await db
    .insert(favoriteBooks)
    .values({ userId: req.user.id, bookId })
    .onConflictDoNothing();
  res.status(201).json({ ok: true });
});

router.delete("/:bookId", validate({ params: bookIdParams }), async (req, res) => {
  const { bookId } = req.valid.params;
  await db
    .delete(favoriteBooks)
    .where(and(eq(favoriteBooks.userId, req.user.id), eq(favoriteBooks.bookId, bookId)));
  res.status(204).end();
});

export default router;