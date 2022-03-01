import { Request, Response } from "express";
export type AuthControllerType = {
  register: (req: Request, res: Response) => void;
  login: (req: Request, res: Response) => void;
  refreshToken: (req: Request, res: Response) => void;
  validateToken: (res: Response) => Response;
};
