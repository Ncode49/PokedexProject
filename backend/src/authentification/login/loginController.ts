import { Request, Response } from "express";

import { createCatchErrorMessage } from "../../services/Error";
import { LoginServiceType } from "./loginService";

export type LoginControllerType = (
  req: Request,
  res: Response
) => Promise<Response<any, Record<string, any>>>;

export const loginController =
  (loginService: LoginServiceType): LoginControllerType =>
  async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      const data = loginService.login(username, password);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json(createCatchErrorMessage(error));
    }
  };
