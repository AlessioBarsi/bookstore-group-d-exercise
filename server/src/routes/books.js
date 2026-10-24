import { Router } from "express";
import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { book, author, genre } from "../db/schema.js";

const router = Router();

router.get("/", async (req, res) => {
  const books = await db
    .select({
      id: book.id,
      title: book.title,
      description: book.description,
      price: book.price,
      publishYear: book.publishYear,
      cover: book.cover,
      publisher: book.publisher,
      author: { id: author.id, name: author.name },
      genre: { id: genre.id, name: genre.name },
    })
    .from(book)
    .innerJoin(author, eq(book.authorId, author.id))
    .innerJoin(genre, eq(book.genreId, genre.id))
    .orderBy(book.title);

  res.json(books);
});

export default router;