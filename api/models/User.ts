import { db } from "../db.js";
import { NotFoundError } from "../expressError.js";

export default class User {
  constructor(
    private username: string,
    private email: string,
    private isAdmin: boolean,
    private joinDate: Date
  ) {}

  static async get(username: string): Promise<User> {
    const result = await db.query(
      `
      SELECT username, email, is_admin as "isAdmin", join_date as "joinDate"
      FROM users
      WHERE username = $1`,
      [username]
    );
    const user: User | undefined = result.rows[0];

    if (!user) throw new NotFoundError(`No user with username ${username}`);

    return new User(user.username, user.email, user.isAdmin, user.joinDate);
  }
}
