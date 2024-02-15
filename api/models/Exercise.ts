import { db } from "../db.js";

export default class Exercise {
  constructor(private id: number, private name: string) {}

  static async getAll(): Promise<Exercise[]> {
    const result = await db.query("SELECT * FROM exercises;");

    const exercises = result.rows.map((e) => new Exercise(e.id, e.name));

    return exercises;
  }
}
