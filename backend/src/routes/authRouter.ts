import express from "express";
import { AuthController } from "../controllers/authControllers/AuthController";

import { extractJWT } from "../middleware/extractJWT";

// le controleur contient les methodes associé aux routes
export const authRouter = (authController: AuthController) => {
  const authRouter = express.Router();

  authRouter.post("/register", authController.register);

  authRouter.post("/login", authController.login);

  authRouter.post("/refreshToken", authController.refreshToken);
  // route to test if the middleware is valid
  // est ce que l'on doit ajouter des services dans les middlewares ?
  authRouter.get("/validateToken", extractJWT, authController.validateToken);

  return authRouter;
};
