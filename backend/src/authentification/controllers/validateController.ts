import { Response } from "express";

export const validateToken = (res: Response) => {
  return res.status(200).json({
    message: "Token(s) validated",
  });
};
