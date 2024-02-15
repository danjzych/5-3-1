import express, { Application, Request, Response, NextFunction } from "express";
import morgan from "morgan";
import { ExpressError, NotFoundError } from "./expressError.js";

import exerciseRoutes from "./routes/exercises.js";
import userRoutes from "./routes/users.js";

const app: Application = express();

app.use(express.json());
app.use(morgan("tiny"));

app.use("/exercises", exerciseRoutes);
app.use("/users", userRoutes);

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  throw new NotFoundError();
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (
  err: ExpressError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  /* istanbul ignore next (ignore for coverage) */
  const status = err?.status ?? 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

export default app;
