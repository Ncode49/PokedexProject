import { Request, Response } from "express";
import {
  createCatchErrorMessage,
  createErrorMessage,
} from "../../services/Error";
import { RefreshTokenServiceType } from "./RefreshTokenService";
export type RefreshTokenControllerType = (
  req: Request,
  res: Response
) => Promise<Response<any, Record<string, any>>>;

export const RefreshTokenController =
  (refreshTokenService: RefreshTokenServiceType): RefreshTokenControllerType =>
  async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (token === undefined)
        return res
          .status(400)
          .json(createErrorMessage("token is undefined unauthorized"));

      const tokenOrError = refreshTokenService.refreshToken(token);
      if (tokenOrError.type == "error")
        return res.status(400).json(tokenOrError);

      return res.status(200).json({ accessToken: tokenOrError });
    } catch (error) {
      return res.status(500).json(createCatchErrorMessage(error));
    }
  };
