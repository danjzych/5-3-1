import {
  describe,
  it,
  expect,
  beforeAll,
  beforeEach,
  afterEach,
  afterAll,
  expectTypeOf,
} from "vitest";
import { db } from "../db";
import User from "./User";
import { BadRequestError } from "../expressError";

import {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} from "./_testCommon";

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("register", () => {
  const testUserData = {
    username: "testuser2",
    password: "testpassword",
    email: "testuser2@gmail.com",
  };

  it("valid non-admin user", async () => {
    const testUser = await User.register(
      testUserData.username,
      testUserData.password,
      testUserData.email
    );

    expect(testUser).toBeInstanceOf(User);
    expect(testUser).toMatchObject({
      username: "testuser2",
      email: "testuser2@gmail.com",
      isAdmin: false,
    });

    const result = await db.query(
      `SELECT * FROM users WHERE username = 'testuser2'`
    );

    expect(result.rows.length).toEqual(1);
    expect(result.rows[0].is_admin).toBeFalsy();
  });

  it("valid admin user", async () => {
    const testUser = await User.register(
      testUserData.username,
      testUserData.password,
      testUserData.email,
      true
    );

    expect(testUser).toBeInstanceOf(User);
    expect(testUser).toMatchObject({
      username: "testuser2",
      email: "testuser2@gmail.com",
      isAdmin: true,
    });

    const result = await db.query(
      `SELECT * FROM users WHERE username = 'testuser2'`
    );

    expect(result.rows.length).toEqual(1);
    expect(result.rows[0].is_admin).toBeTruthy();
  });

  it("throws error if username already taken", async () => {
    testUserData.username = "testuser";

    expect(async () => {
      await User.register(
        testUserData.username,
        testUserData.password,
        testUserData.email
      );
    }).rejects.toThrow(BadRequestError);

    const result = await db.query(
      `SELECT * FROM users WHERE username = 'testuser2'`
    );

    expect(result.rows.length).toEqual(0);
  });
});

describe("autehnticate", () => {});

describe("get", () => {});
