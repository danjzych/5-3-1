import {
  describe,
  it,
  expect,
  beforeAll,
  beforeEach,
  afterEach,
  afterAll,
} from "vitest";
import Exercise from "./Exercise";

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

describe("getAll", () => {
  const basicExercises = [
    { id: 1, name: "Back Squat" },
    { id: 2, name: "Deadlift" },
    { id: 3, name: "Overhead Press" },
    { id: 4, name: "Bench Press" },
    { id: 5, name: "Dips" },
  ];

  it("should return all basic exercises", async () => {
    const results = await Exercise.getAll();

    expect(results).toEqual(basicExercises);
  });
});
