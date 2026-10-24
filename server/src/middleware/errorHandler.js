export function notFound(req, res) {
  res.status(404).json({ error: "Not found" });
}

export function errorHandler(err, req, res, next) {
  // Drizzle wraps the Postgres error; the original is in err.cause
  const pgCode = err.cause?.code ?? err.code;

  if (pgCode === "23505") {
    return res.status(409).json({ error: "Already exists" });
  }
  if (pgCode === "23503") {
    return res.status(400).json({ error: "Referenced record does not exist" });
  }

  console.error(err);
  res.status(err.status ?? 500).json({ error: "Internal server error" });
}