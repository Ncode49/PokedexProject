import express from "express";
import { register, validateToken } from "../controllers/authController";
import extractJWT from "../middleware/extractJWT";
// get the different routes
const authRouter = express.Router();

authRouter.post("/register", register);
//authRouter.get("/validate", extractJWT, validateToken);

export default authRouter;
