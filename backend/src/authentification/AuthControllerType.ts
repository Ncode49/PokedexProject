import { Request, Response } from "express";
export type AuthControllerType = {
  register: (req: Request, res: Response) => void;
};
