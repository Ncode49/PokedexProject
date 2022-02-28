import express from "express";

// le controleur contient les methodes associé aux routes
export const authRouter = (authController: any) => {
  const authRouter = express.Router();

  authRouter.post("/register", authController.register);

  //authRouter.post("/login", authController.login);

  // authRouter.post("/refreshToken", authController.refreshToken);
  // route to test if the middleware is valid
  // est ce que l'on doit ajouter des services dans les middlewares ?
  // authRouter.get("/validateToken", extractJWT, authController.validateToken);

  return authRouter;
};
