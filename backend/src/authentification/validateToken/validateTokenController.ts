import { Response } from "express";
export type ValidateTokenControllerType = (
  res: Response
) => Response<any, Record<string, string>>;
export const ValidateTokenController: ValidateTokenControllerType = (
  res: Response
) => {
  return res.status(200).json({
    message: "Token(s) validated",
  });
};
