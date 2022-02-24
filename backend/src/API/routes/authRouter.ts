import express from "express";
import { login } from "../controllers/authControllers/loginController";
import {
  register,
  validateToken,
} from "../controllers/authControllers/registerController";
import extractJWT from "../middleware/extractJWT";
// get the different routes
const authRouter = express.Router();

authRouter.post("/register", register);
//authRouter.get("/validate", extractJWT, validateToken);

authRouter.post("/login", login);
export default authRouter;

// route to test if the middleware is valid
authRouter.get("/validateToken", extractJWT, validateToken);
