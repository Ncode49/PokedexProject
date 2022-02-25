"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("./controllers/authControllers/AuthController");
const config_1 = __importDefault(require("./config/config"));
const authRouter_1 = require("./routes/authRouter");
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
// gérer le client ici
// define controller les methodes utilisé
/*
const foo = (param1: string) => {
  return (param2: string) => {
    return param1 + param2;
  };
};
// param1 controller
// fonctionnalité du controleur
// param2 req,res,next
*/
// add routes for auth
app.use("/auth", (0, authRouter_1.authRouter)(new AuthController_1.AuthController()));
// AuthService contient repository ou autre service
// const authService = AuthService(...)
// définit toutes les routes
// const authController = AuthController(authService)
// app.use("/auth", authRouter(authController));
// listen
app.listen(config_1.default.server.port, () => {
    console.log(`listening on ${config_1.default.server.port}`);
});
