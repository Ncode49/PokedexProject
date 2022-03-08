"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateAccessToken = exports.JWTService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config/config"));
const Error_1 = require("../Error");
const JWTService = () => {
    return {
        generateAccessToken: exports.generateAccessToken,
        generateRefreshToken: exports.generateRefreshToken,
        verifyRefreshToken: verifyRefreshToken,
        verifyAccessToken: verifyAccessToken,
    };
};
exports.JWTService = JWTService;
const verifyToken = (token, secret) => {
    try {
        jsonwebtoken_1.default.verify(token, secret);
        const decoded = jsonwebtoken_1.default.decode(token);
        return {
            type: 'success',
            payload: decoded,
        };
    }
    catch (error) {
        return (0, Error_1.createCatchErrorMessage)(error);
    }
};
const verifyRefreshToken = (token) => {
    return verifyToken(token, config_1.default.server.token.refreshTokenSecret);
};
const verifyAccessToken = (token) => {
    return verifyToken(token, config_1.default.server.token.accessTokenSecret);
};
const generateToken = (user, config, tokenOptions) => {
    try {
        const token = jsonwebtoken_1.default.sign({ user }, config, tokenOptions);
        return {
            type: 'success',
            token: token,
        };
    }
    catch (error) {
        return (0, Error_1.createCatchErrorMessage)(error);
    }
};
// durée de vie courte
const generateAccessToken = (user) => {
    return generateToken(user, config_1.default.server.token.accessTokenSecret, {
        algorithm: 'HS256',
        expiresIn: '1y',
    });
};
exports.generateAccessToken = generateAccessToken;
// durée de vie longue
const generateRefreshToken = (user) => {
    return generateToken(user, config_1.default.server.token.refreshTokenSecret, {
        algorithm: 'HS256',
        expiresIn: '1y',
    });
};
exports.generateRefreshToken = generateRefreshToken;
