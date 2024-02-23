import express from "express";
import Exercise from "../models/Exercise.js";

const router = express.Router({ mergeParams: true });

/** GET / {} => { exercises }
 *
 * Returns { exercises: [{ id: 1, name: 'name' }, ...] }
 *
 * Authorization Required: None
 */
router.get("/", async function (req, res, next) {
  const exercises = await Exercise.getAll();

  return res.json({ exercises });
});

export default router;
