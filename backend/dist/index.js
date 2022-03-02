"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pg_1 = require("pg");
const AutControllerDI_1 = require("./authentification/AutControllerDI");
const LoginController_1 = require("./authentification/Login/LoginController");
const LoginService_1 = require("./authentification/login/LoginService");
const RefreshTokenController_1 = require("./authentification/RefreshToken/RefreshTokenController");
const RefreshTokenService_1 = require("./authentification/refreshToken/RefreshTokenService");
const RegisterController_1 = require("./authentification/Register/RegisterController");
const RegisterService_1 = require("./authentification/Register/RegisterService");
const ValidateTokenController_1 = require("./authentification/ValidateToken/ValidateTokenController");
const config_1 = __importDefault(require("./config/config"));
const authRouter_1 = require("./routes/authRouter");
const CryptoService_1 = require("./services/CryptoService/CryptoService");
const TokenService_1 = require("./services/TokenService/TokenService");
const UserR_1 = require("./services/UserR/UserR");
const app = (0, express_1.default)();
// load middleware we need
// parse the data from input PUT or POST
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// middleware to connect localhost for http server
app.use((_req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});
// instanciation du client
const client = new pg_1.Client(config_1.default.postgres);
// instantiation des services génériques
const tokenService = (0, TokenService_1.TokenService)();
const cryptoService = (0, CryptoService_1.CryptService)();
const userR = (0, UserR_1.UserR)(client);
// instanciation des services spécifiques
const loginService = (0, LoginService_1.LoginService)(userR, cryptoService, tokenService);
const registerService = (0, RegisterService_1.RegisterService)(userR, cryptoService);
const refreshtokenService = (0, RefreshTokenService_1.RefreshTokenService)(tokenService);
// instantiation des controllers spécifiques
const loginController = (0, LoginController_1.LoginController)(loginService);
const registerController = (0, RegisterController_1.RegisterController)(registerService);
const refreshTokenController = (0, RefreshTokenController_1.RefreshTokenController)(refreshtokenService);
const validateTokenController = ValidateTokenController_1.ValidateTokenController;
// instanciation du controller globale
const authController = (0, AutControllerDI_1.AuthControllerDI)(registerController, loginController, refreshTokenController, validateTokenController);
app.use("/auth", (0, authRouter_1.authRouter)(authController));
app.listen(config_1.default.server.port, () => {
    console.log(`listening on ${config_1.default.server.port}`);
});
