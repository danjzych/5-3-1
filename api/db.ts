/** Database Setup */
import pkg from "pg";
const { Client } = pkg;

export const DB_URI =
  process.env.NODE_ENV === "test"
    ? "postgresql:///_531_test"
    : "postgresql:///_531";

export const db = new Client({ connectionString: DB_URI });

db.connect();
