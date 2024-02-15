import { describe, test, it, expect } from "vitest";
import { DB_URI } from "./db.js";

describe("Database", () => {
  it("should be using test db postgresql:::/_531_test", () => {
    expect(DB_URI).toEqual("postgresql:///_531_test");
  });
});
