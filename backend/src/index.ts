import express from "express";
import { Client, Pool } from "pg";
import {
  AuthControllerDI,
  LoginController,
  LoginService,
  RefreshTokenController,
  RefreshTokenService,
  RegisterController,
  RegisterService,
  ValidateTokenController,
} from "./authentification";

import config from "./config/config";
import { authRouter } from "./routes/authRouter";
import { CryptService, TokenService, UserR } from "./services";

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
const pool = new Pool(config.postgres);
// instantiation des services génériques
const tokenService = TokenService();
const cryptoService = CryptService();
const userR = UserR(pool);
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
const authController = AuthControllerDI(
  registerController,
  loginController,
  refreshTokenController,
  validateTokenController
);
app.use("/auth", authRouter(authController));

app.listen(config.server.port, () => {
  console.log(`listening on ${config.server.port}`);
});
