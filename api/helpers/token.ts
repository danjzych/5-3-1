import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config.js";
import User from "../models/User";

/** return signed JWT {username, isAdmin} from user data. */

export function createToken(user: User) {
  console.assert(
    user.isAdmin !== undefined,
    "createToken passed user without isAdmin property"
  );

  let payload = {
    username: user.username,
    isAdmin: user.isAdmin || false,
  };

  return jwt.sign(payload, SECRET_KEY);
}
