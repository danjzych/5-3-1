import express, { Application, Request, Response, NextFunction } from "express";
import User from "../models/User.js";

import { ExpressError, NotFoundError } from "../expressError.js";

const router = express.Router({ mergeParams: true });

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
