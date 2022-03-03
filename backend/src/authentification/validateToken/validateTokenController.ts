import { Response, Request } from "express";
export type ValidateTokenControllerResultType = Response<
  any,
  Record<string, string>
>;
export type ValidateTokenControllerType = (
  res: Response
) => ValidateTokenControllerResultType;
export const ValidateTokenController: ValidateTokenControllerType = (
  res: Response
): ValidateTokenControllerResultType => {
  console.log("pass in controller");
  return res.status(200).json({
    message: "Token(s) validated",
  });
};
