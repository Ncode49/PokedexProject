"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pg_1 = require("pg");
const authentification_1 = require("./authentification");
const config_1 = __importDefault(require("./config/config"));
const authRouter_1 = require("./routes/authRouter");
const services_1 = require("./services");
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
const pool = new pg_1.Pool(config_1.default.postgres);
// instantiation des services génériques
const tokenService = (0, services_1.TokenService)();
const cryptoService = (0, services_1.CryptService)();
const userR = (0, services_1.UserR)(pool);
// instantiation du service spécifique
const authService = (0, authentification_1.AuthService)(userR, cryptoService, tokenService);
// instanciation du controller globale
const authController = (0, authentification_1.AuthControllerDI)(authService);
app.use("/auth", (0, authRouter_1.authRouter)(authController));
app.listen(config_1.default.server.port, () => {
    console.log(`listening on ${config_1.default.server.port}`);
});
