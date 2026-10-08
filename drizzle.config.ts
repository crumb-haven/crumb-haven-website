import { defineConfig } from "drizzle-kit";

// DATABASE_URL is only needed for commands that connect to the database
// (e.g. `db:push`); `drizzle-kit generate` works without it.
export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "",
  },
});
