"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loginController_1 = require("../controllers/authControllers/loginController");
const refreshtokenController_1 = require("../controllers/authControllers/refreshtokenController");
const registerController_1 = require("../controllers/authControllers/registerController");
const validateController_1 = require("../controllers/authControllers/validateController");
const extractJWT_1 = require("../middleware/extractJWT");
// get the different routes
const authRouter = express_1.default.Router();
authRouter.post("/register", registerController_1.register);
authRouter.post("/login", loginController_1.login);
exports.default = authRouter;
authRouter.post("/refreshToken", refreshtokenController_1.refreshToken);
// route to test if the middleware is valid
authRouter.get("/validateToken", extractJWT_1.extractJWT, validateController_1.validateToken);
