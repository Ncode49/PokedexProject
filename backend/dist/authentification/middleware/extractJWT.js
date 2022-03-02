"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config/config"));
// 401 unauthorized
const extractJWT = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    console.log(config_1.default.server.token.accessTokenSecret);
    if (token == null)
        return res
            .status(401)
            .json({ type: "error", message: "no token in header" });
    jsonwebtoken_1.default.verify(token, config_1.default.server.token.accessTokenSecret, (err, _user) => {
        if (err)
            return res.status(403).json(err.message);
        next();
    });
};
exports.extractJWT = extractJWT;
