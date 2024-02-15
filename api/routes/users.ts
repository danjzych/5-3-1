import express, { Application, Request, Response, NextFunction } from "express";
import User from "../models/User.js";

import { ExpressError, NotFoundError } from "../expressError.js";

const router = express.Router({ mergeParams: true });

router.get("/:username", async function (req, res, next) {
  const user = await User.get(req.params.username);

  return res.json({ user });
});

export default router;
