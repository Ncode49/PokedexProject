import express from "express";
import { Client } from "pg";
import { AuthControllerDI } from "./authentification/AutControllerDI";
import { LoginController } from "./authentification/Login/LoginController";
import { LoginService } from "./authentification/login/LoginService";
import { RefreshTokenController } from "./authentification/RefreshToken/RefreshTokenController";
import {
  RefreshTokenService,
  refreshTokenService,
} from "./authentification/refreshToken/RefreshTokenService";
import { RegisterController } from "./authentification/Register/RegisterController";
import {
  RegisterService,
  registerService,
} from "./authentification/Register/RegisterService";
import { ValidateTokenController } from "./authentification/ValidateToken/ValidateTokenController";

import config from "./config/config";
import { authRouter } from "./routes/authRouter";
import { CryptService } from "./services/CryptoService/CryptoService";
import {
  TokenService,
  tokenService,
} from "./services/TokenService/TokenService";
import { UserR } from "./services/UserR/UserR";
const app = express();

// load middleware we need
// parse the data from input PUT or POST
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// middleware to connect localhost for http server
app.use((_req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
// instanciation du client
const client = new Client(config.postgres);
// instantiation des services génériques
const tokenService = TokenService();
const cryptoService = CryptService();
const userR = UserR(client);
// instanciation des services spécifiques
const loginService = LoginService(userR, cryptoService, tokenService);
const registerService = RegisterService(userR, cryptoService);
const refreshtokenService = RefreshTokenService(tokenService);
// instantiation des controllers spécifiques
const loginController = LoginController(loginService);
const registerController = RegisterController(registerService);
const refreshTokenController = RefreshTokenController(refreshtokenService);
const validateTokenController = ValidateTokenController;

// instanciation du controller globale
const authController = AuthControllerDI();
app.use("/auth", authRouter(authController));

app.listen(config.server.port, () => {
  console.log(`listening on ${config.server.port}`);
});
