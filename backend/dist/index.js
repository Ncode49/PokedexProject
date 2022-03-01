"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AutControllerDI_1 = require("./authentification/AutControllerDI");
const Client_1 = require("./services/Client");
const CryptoService_1 = require("./services/cryptoService/CryptoService");
const QueryService_1 = require("./services/queryService/QueryService");
const tokenService_1 = require("./services/tokenService/tokenService");
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
const authController = (0, AutControllerDI_1.AuthControllerDI)({
    queryService: (0, QueryService_1.queryService)({ client: Client_1.client }),
    tokenService: (0, tokenService_1.tokenService)(),
    cryptoService: (0, CryptoService_1.cryptService)(),
});
app.use("/auth", (0, authRouter_1.authRouter)(authController));
app.listen(config_1.default.server.port, () => {
    console.log(`listening on ${config_1.default.server.port}`);
});
