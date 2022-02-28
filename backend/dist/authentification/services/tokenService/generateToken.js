"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../../config/config"));
// durée de vie courte
const generateAccessToken = (user) => {
    return jsonwebtoken_1.default.sign({ user }, config_1.default.server.token.accessTokenSecret, {
        algorithm: "HS256",
        expiresIn: "1m",
    });
};
exports.generateAccessToken = generateAccessToken;
// durée de vie longue
const generateRefreshToken = (user) => {
    return jsonwebtoken_1.default.sign({ user }, config_1.default.server.token.refreshTokenSecret, {
        algorithm: "HS256",
        expiresIn: "1y",
    });
};
exports.generateRefreshToken = generateRefreshToken;
