import express from "express";
import { AuthControllerType } from "../authentification/AutControllerDI";

import { extractJWT } from "../authentification/middleware/extractJWT";

// le controleur contient les methodes associé aux routes
export const authRouter = (authController: AuthControllerType) => {
  const authRouter = express.Router();
  authRouter.post("/register", authController.register);
  authRouter.post("/login", authController.login);
  authRouter.post("/refreshToken", authController.refreshToken);
  authRouter.get("/validateToken", extractJWT, authController.validateToken);

  return authRouter;
};
