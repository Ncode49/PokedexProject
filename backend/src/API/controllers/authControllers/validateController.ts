import { NextFunction, Request, Response } from "express";

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(200).json({
    message: "Token(s) validated",
  });
};