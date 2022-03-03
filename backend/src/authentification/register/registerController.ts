// prend en paramaetre les méthode qui renvoit un service

import { Request, Response } from "express";
import { createCatchErrorMessage } from "../../services/Error";
import { RegisterServiceType } from "./RegisterService";
// ce qui est dans les ervice peut etre appelée dans la methode renvoyé
// client est la dépendance
export type RegisterControllerResultType = Promise<
  Response<any, Record<any, string>>
>;
export type RegisterControllerType = (
  req: Request,
  res: Response
) => RegisterControllerResultType;
export const RegisterController =
  (registerService: RegisterServiceType) =>
  async (req: Request, res: Response): RegisterControllerResultType => {
    try {
      const { username, password } = req.body;
      const message = await registerService.register(username, password);
      if (message.type == "success") return res.status(200).json(message);
      return res.status(500).json(message);
    } catch (error) {
      return res.status(400).json(createCatchErrorMessage(error));
    }
  };
