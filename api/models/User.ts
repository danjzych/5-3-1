import { db } from "../db.js";
import * as bcrypt from "bcrypt";
import { BCRYPT_WORK_FACTOR } from "../config.js";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../expressError.js";

export default class User {
  constructor(
    readonly username: string,
    readonly email: string,
    readonly isAdmin: boolean,
    readonly joinDate: Date
  ) {}

  /** Authenticate a user. Throw error is name + PW incorrect */
  static async authenticate(username: string, password: string) {
    const result = await db.query(
      `
      SELECT username, password, email, is_admin as "isAdmin", join_date as "joinDate"
      FROM users
      WHERE username = $1`,
      [username]
    );

    type tUserWithPassword = User & {
      password: string;
    };

    const user: tUserWithPassword | undefined = result.rows[0];

    console.log(user);

    if (user) {
      // compare hashed password to a new hash from password
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid === true) {
        return new User(user.username, user.email, user.isAdmin, user.joinDate);
      }
    }

    throw new UnauthorizedError("Invalid username/password");
  }

  /** Register a user. Throw error if username taken */
  static async register(
    username: string,
    password: string,
    email: string,
    isAdmin: boolean = false
  ): Promise<User> {
    const duplicateCheck = await db.query(
      `
    SELECT username
    FROM users
    WHERE username = $1`,
      [username]
    );

    if (duplicateCheck.rows.length > 0) {
      throw new BadRequestError(`Duplicate username: ${username}`);
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const result = await db.query(
      `
    INSERT INTO users (
      username,
      password,
      email,
      is_admin
    )
    VALUES ($1, $2, $3, $4)
    RETURNING
    username,
    email,
    is_admin as "isAdmin",
    join_date as "joinDate"`,
      [username, hashedPassword, email, isAdmin]
    );

    const user = result.rows[0];

    return new User(user.username, user.email, user.isAdmin, user.joinDate);
  }

  /** Get a user by username. Throw error if they do not exist */
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
