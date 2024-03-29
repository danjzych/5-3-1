import express from "express";
import User from "../models/User.js";
import { createToken } from "../helpers/token.js";
import * as jsonschema from "jsonschema";
import authSchema from "../schemas/auth.json" assert { type: "json" };
import registerSchema from "../schemas/register.json" assert { type: "json" };
import { BadRequestError } from "../expressError.js";

const router = express.Router({ mergeParams: true });

/** POST /auth/token:  { username, password } => { token }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Auth: none
 */

router.post("/token", async function (req, res, next) {
  const validator = jsonschema.validate(req.body, authSchema, {
    required: true,
  });
  if (!validator.valid) {
    const errs = validator.errors.map((e) => e.stack).join(", ");
    throw new BadRequestError(errs);
  }

  const { username, password } = req.body;
  const user = await User.authenticate(username, password);
  const token = createToken(user);
  return res.json({ token });
});

/** POST /auth/register: { username, password, email } => { User }
 *
 * Returns user object object.
 *
 * Auth: None
 *
 */
router.post("/register", async function (req, res, next) {
  const validator = jsonschema.validate(req.body, registerSchema, {
    required: true,
  });
  if (!validator.valid) {
    const errs = validator.errors.map((e) => e.stack).join(", ");
    throw new BadRequestError(errs);
  }

  const newUser = await User.register(
    req.body.username,
    req.body.password,
    req.body.email,
    false
  );
  const token = createToken(newUser);

  return res.status(201).json({ token });
});

export default router;
