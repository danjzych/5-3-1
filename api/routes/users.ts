import express from "express";
import User from "../models/User.js";
import { ensureCorrectUserOrAdmin } from "../middleware/auth.js";

const router = express.Router({ mergeParams: true });

router.get(
  "/:username",
  ensureCorrectUserOrAdmin,
  async function (req, res, next) {
    const user = await User.get(req.params.username);

    return res.json({ user });
  }
);

export default router;
