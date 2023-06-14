import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

const handleErrors = (
  error: unknown,
  _: Request,
  res: Response,
  __: NextFunction
): Response => {
  if (error instanceof AppError) {
    return res.status(error.status).json({ message: error.message });
  }

  console.error(error);
  return res.status(500).json({ message: "Internal server error" });
};

export default handleErrors;
