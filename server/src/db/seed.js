import "dotenv/config";
import { auth } from "../auth/auth.js";
import { db } from "./index.js";
import { user, author, genre, book, favoriteBooks } from "./schema.js";

import genresData from "./seed-data/genres.json" with { type: "json" };
import authorsData from "./seed-data/authors.json" with { type: "json" };
import booksData from "./seed-data/books.json" with { type: "json" };
import usersData from "./seed-data/users.json" with { type: "json" };

async function seed() {
  console.log("Seeding database...");

  await db.delete(favoriteBooks);
  await db.delete(book);
  await db.delete(author);
  await db.delete(genre);
  await db.delete(user);

  // Insert genres
  const genres = await db.insert(genre).values(genresData).returning();

  // Insert authors
  const authors = await db.insert(author).values(authorsData).returning();

  // Build lookup maps (name → id)
  const genreMap = Object.fromEntries(genres.map((g) => [g.name, g.id]));
  const authorMap = Object.fromEntries(authors.map((a) => [a.name, a.id]));

  // Insert books — resolve authorName/genreName to IDs
  const bookRows = booksData.map((b) => ({
    title: b.title,
    description: b.description,
    authorId: authorMap[b.authorName],
    genreId: genreMap[b.genreName],
    price: b.price,
    publishYear: b.publishYear,
  }));
  const books = await db.insert(book).values(bookRows).returning();

  // Insert users
  const users = [];
  for (const u of usersData) {
    const res = await auth.api.signUpEmail({
      body: { name: u.name, email: u.email, password: "password123" },
    });
    users.push(res.user);
  }

  // Insert some favorites
  await db.insert(favoriteBooks).values([
    { userId: users[0].id, bookId: books[0].id },
    { userId: users[0].id, bookId: books[1].id },
    { userId: users[1].id, bookId: books[2].id },
  ]);

  console.log("Seeding complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});