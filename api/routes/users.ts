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

router.get(
  "/:username/training-maxes",
  ensureCorrectUserOrAdmin,
  async function (req, res, next) {
    const training_maxes = await User.getTrainingMaxes(req.params.username);

    return res.json({ training_maxes });
  }
);

export default router;
