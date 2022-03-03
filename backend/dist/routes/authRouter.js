"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
// le controleur contient les methodes associé aux routes
const authRouter = (authController, extractJWT) => {
    const authRouter = express_1.default.Router();
    authRouter.post("/register", authController.register);
    authRouter.post("/login", authController.login);
    authRouter.post("/refreshToken", authController.refreshToken);
    authRouter.get("/validateToken", extractJWT, authController.validateToken);
    return authRouter;
};
exports.authRouter = authRouter;
