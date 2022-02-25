import express from "express";
import { login } from "../controllers/authControllers/loginController";
import { refreshToken } from "../controllers/authControllers/refreshtokenController";
import { register } from "../controllers/authControllers/registerController";
import { validateToken } from "../controllers/authControllers/validateController";
import { extractJWT } from "../middleware/extractJWT";
// get the different routes
const authRouter = express.Router();

authRouter.post("/register", register);

authRouter.post("/login", login);
export default authRouter;

authRouter.post("/refreshToken", refreshToken);
// route to test if the middleware is valid
authRouter.get("/validateToken", extractJWT, validateToken);
