import { db } from "../db";

/**
 * Setup test DB for models tests.
 */
export async function commonBeforeAll(): Promise<void> {
  await db.query("DELETE FROM sets;");
  await db.query("DELETE FROM workouts;");
  await db.query("DELETE FROM training_blocks;");
  await db.query("DELETE FROM training_maxes;");
  await db.query("DELETE FROM users;");

  await db.query(
    `INSERT INTO users (username, password, email, is_Admin) VALUES ('testuser', 'testpw', 'test@531.com', FALSE)`
  );
}

export async function commonBeforeEach(): Promise<void> {
  await db.query("BEGIN");
}

export async function commonAfterEach(): Promise<void> {
  await db.query("ROLLBACK");
}

export async function commonAfterAll(): Promise<void> {
  await db.end();
}
