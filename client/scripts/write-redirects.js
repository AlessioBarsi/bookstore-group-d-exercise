import { writeFileSync } from "node:fs";

const api = process.env.API_ORIGIN;
if (!api) throw new Error("API_ORIGIN is not set");

writeFileSync(
  "public/_redirects",
  [
    `/api/*      ${api}/api/:splat      200`,
    `/uploads/*  ${api}/uploads/:splat  200`,
    `/*          /index.html             200`,
    "",
  ].join("\n")
);