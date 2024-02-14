/** Database Setup */

import pkg from "pg";
const { Client } = pkg;

const DB_URI =
  process.env.NODE_ENV === "test"
    ? "postgresql:///_531_test"
    : "postgresql:///_531_test";

export const db = new Client({ connectionString: DB_URI });

db.connect();
