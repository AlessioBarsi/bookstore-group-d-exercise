export const validate = (schemas) => (req, res, next) => {
  const valid = {};

  for (const key of ["params", "query", "body"]) {
    if (!schemas[key]) continue;
    const result = schemas[key].safeParse(req[key]);
    if (!result.success) {
      return res.status(400).json({
        error: "Validation failed",
        issues: result.error.issues.map((i) => ({
          path: i.path.join("."),
          message: i.message,
        })),
      });
    }
    valid[key] = result.data;
  }

  req.valid = valid;
  next();
};