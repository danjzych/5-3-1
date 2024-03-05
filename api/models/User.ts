import { db } from "../db.js";
import * as bcrypt from "bcrypt";
import { PrimaryLift } from "./Lift.js";
import { BCRYPT_WORK_FACTOR } from "../config.js";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../expressError.js";
import {
  TrainingMax,
  TrainingBlock,
  iUser,
  PrimaryLiftName,
} from "../types.js";

export default class User implements iUser {
  constructor(
    readonly username: string,
    readonly email: string,
    readonly isAdmin: boolean,
    readonly joinDate: Date,
    readonly trainingBlock?: TrainingBlock
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

  /** Get user's training maxes */
  static async getTrainingMaxes(
    username: string,
    limit: number = 1
  ): Promise<TrainingMax[]> {
    const currentTrainingBlock = await db.query(
      `
    SELECT id
    FROM training_blocks
    WHERE username = $1
    ORDER BY start_date desc
    LIMIT $2
    `,
      [username, limit]
    );

    const currentTrainingMaxes = await db.query(
      `
        SELECT exercises.name AS exercise, training_maxes.weight_lb AS weight
        FROM training_maxes
        INNER JOIN exercises ON training_maxes.exercise_id = exercises.id
        WHERE training_maxes.training_block_id = $1
      `,
      [currentTrainingBlock.rows[0]?.id]
    );

    return currentTrainingMaxes.rows;
  }

  static async addTrainingMax(
    weight: number,
    exerciseId: number,
    trainingBlockId: number
  ): Promise<TrainingMax> {
    const result = await db.query(
      `
      INSERT INTO training_maxes (weight_lb, exercise_id, training_block_id)
      VALUES ($1, $2, $3)
      RETURNING
      exercise_id AS "exerciseId", weight_lb AS weight`,
      [weight, exerciseId, trainingBlockId]
    );

    return result.rows[0];
  }

  /** Get user's current training block. Should not be called outside class */
  private static async getTrainingBlock(
    username: string
  ): Promise<TrainingBlock> {
    const currentTrainingMaxes = await this.getTrainingMaxes(username);

    const primaryLifts = currentTrainingMaxes.map(
      (m) => new PrimaryLift(m.exercise, m.weight).trainingBlock
    );

    const currentTrainingBlock: TrainingBlock = {} as TrainingBlock;

    //TODO: get accessory lifts as well when the time comes

    return { primary: primaryLifts };
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

    const currentTrainingBlock = await this.getTrainingBlock(username);

    return new User(
      user.username,
      user.email,
      user.isAdmin,
      user.joinDate,
      currentTrainingBlock
    );
  }

  static async createTrainingBlock(
    username: string,
    trainingMaxes: { id: number; weight: number }[]
  ): Promise<TrainingBlock> {
    //TODO: add pre check

    const trainingBlockResult = await db.query(
      `
    INSERT INTO training_blocks (username)
    VALUES ($1)
    RETURNING id`,
      [username]
    );

    const trainingBlockId: number = trainingBlockResult.rows[0].id;

    for (const max of trainingMaxes) {
      await User.addTrainingMax(max.weight, max.id, trainingBlockId);
    }

    return await User.getTrainingBlock(username);
  }
}
