"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pg_1 = require("pg");
const authentification_1 = require("./authentification");
const config_1 = __importDefault(require("./config/config"));
const AuthRouter_1 = require("./authentification/AuthRouter");
const services_1 = require("./services");
const likeRouter_1 = require("./like/likeRouter");
const LikeController_1 = require("./like/LikeController");
const LikeRepository_1 = require("./services/Repository/LikeRepository");
const like_1 = require("./like");
const BaseRepository_1 = require("./services/Repository/BaseRepository");
const app = (0, express_1.default)();
// load middleware we need
// parse the data from input PUT or POST
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// middleware to connect localhost for http server
app.use((_req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
// instanciation du client
const pool = new pg_1.Pool(config_1.default.postgres);
// instantiation des services génériques
const jwtService = (0, services_1.JWTService)();
const cryptoService = (0, services_1.CryptService)();
const baseRepository = (0, BaseRepository_1.BaseRepository)(pool);
const userRepository = (0, services_1.UserRepository)(baseRepository);
const likeRepository = (0, LikeRepository_1.LikeRepository)(baseRepository);
// instanciation des middleware
const extractJWT = (0, authentification_1.ExtractJWT)(jwtService);
// instantiation du service spécifique
const authService = (0, authentification_1.AuthService)(userRepository, cryptoService, jwtService);
const likeService = (0, like_1.LikeService)(likeRepository);
// instanciation du controller globale
const authController = (0, authentification_1.AuthControllerDI)(authService);
const likeController = (0, LikeController_1.LikeController)(likeService);
app.use('/auth', (0, AuthRouter_1.authRouter)(authController, extractJWT));
app.use('/like', (0, likeRouter_1.likeRouter)(likeController, extractJWT));
app.listen(config_1.default.server.port, () => {
    console.log(`listening on ${config_1.default.server.port}`);
});
