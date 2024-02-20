import express from "express";
import User from "../models/User.js";
import { createToken } from "../helpers/token.js";
import { ExpressError, NotFoundError } from "../expressError.js";

const router = express.Router({ mergeParams: true });

/** POST /auth/token:  { username, password } => { token }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Authorization required: none
 */

router.post("/token", async function (req, res, next) {
  // const validator = jsonschema.validate(req.body, userAuthSchema, {
  //   required: true,
  // });
  // if (!validator.valid) {
  //   const errs = validator.errors.map((e) => e.stack);
  //   throw new BadRequestError(errs);
  // }

  const { username, password } = req.body;
  const user = await User.authenticate(username, password);
  const token = createToken(user);
  return res.json({ token });
});

router.post("/register", async function (req, res, next) {
  const newUser = await User.register(
    req.body.username,
    req.body.password,
    req.body.email,
    false
  );

  return res.status(201).json({ newUser });
});

export default router;
