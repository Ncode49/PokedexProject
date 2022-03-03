import express, { ErrorRequestHandler, RequestHandler } from "express";
import { AuthControllerType, ExtractJWTType } from "../authentification";

// le controleur contient les methodes associé aux routes
export const authRouter = (
  authController: AuthControllerType,
  extractJWT: any
) => {
  const authRouter = express.Router();
  authRouter.post("/register", authController.register);
  authRouter.post("/login", authController.login);
  authRouter.post("/refreshToken", authController.refreshToken);
  authRouter.get("/validateToken", extractJWT, authController.validateToken);
  return authRouter;
};
