import { Response, Request } from "express";
export type ValidateTokenControllerType = (
  req: Request,
  res: Response
) => Response<any, Record<string, string>>;

export const ValidateTokenController: ValidateTokenControllerType = (
  req: Request,
  res: Response
) => {
  console.log("pass in controller");
  return res.status(200).json({
    message: "Token(s) validated",
  });
};
