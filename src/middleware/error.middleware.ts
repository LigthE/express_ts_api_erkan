import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { AppError } from "../utils/app.error";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  void req;
  void next;

  let statusCode = 500;
  let message = "server error";
  let details: unknown;
  let errors:
    | Array<{ path: string; message: string; code?: string }>
    | undefined;

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  if (err instanceof ZodError) {
    statusCode = 400;
    message = "validation error";
    details = err.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
      code: issue.code,
    }));
  }

  res.status(statusCode).json({ message, details, errors });
};
