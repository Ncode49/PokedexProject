import { Request, Response } from "express";
import { LoginServiceType } from "..";
import { createCatchErrorMessage } from "../../services";
export type LoginControllerResultType = Promise<
  Response<any, Record<string, any>>
>;
export type LoginControllerType = (
  req: Request,
  res: Response
) => LoginControllerResultType;

export const LoginController =
  (loginService: LoginServiceType): LoginControllerType =>
  async (req: Request, res: Response): LoginControllerResultType => {
    try {
      const { username, password } = req.body;
      const data = await loginService.login(username, password);
      if (data.type == "error") return res.status(400).json(data);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json(createCatchErrorMessage(error));
    }
  };
