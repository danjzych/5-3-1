import express from "express";
import User from "../models/User.js";
import { ensureCorrectUserOrAdmin } from "../middleware/auth.js";

const router = express.Router({ mergeParams: true });

/** Get User */
router.get(
  "/:username",
  ensureCorrectUserOrAdmin,
  async function (req, res, next) {
    const user = await User.get(req.params.username);

    return res.json({ user });
  }
);

/** Get users current training maxes */
router.get(
  "/:username/training-maxes",
  ensureCorrectUserOrAdmin,
  async function (req, res, next) {
    const trainingMaxes = await User.getTrainingMaxes(req.params.username);

    return res.json({ trainingMaxes });
  }
);

router.post(
  "/:username/training-maxes",
  ensureCorrectUserOrAdmin,
  async function (req, res, next) {
    const trainingMax = await User.addTrainingMax(
      req.body.weight,
      req.body.exerciseId,
      req.body.trainingBlockId
    );

    return res.json({ trainingMax });
  }
);

/** Create a new training block for a user */
router.post(
  "/:username/training-blocks",
  ensureCorrectUserOrAdmin,
  async function (req, res, next) {
    const trainingBlock = await User.createTrainingBlock(
      req.params.username,
      req.body.trainingMaxes
    );

    return res.json({ trainingBlock });
  }
);

export default router;
