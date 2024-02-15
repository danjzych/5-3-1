import express, { Application, Request, Response, NextFunction } from "express";
import { ExpressError, NotFoundError } from "../expressError.js";

const router = express.Router({ mergeParams: true });

router.get("/", async function (req, res, next) {
  return res.status(200).json({ exercises: "squats" });
});

export default router;
