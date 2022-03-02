"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateAccessToken = exports.TokenService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config/config"));
const Error_1 = require("../Error");
const TokenService = () => {
    return {
        generateAccessToken: exports.generateAccessToken,
        generateRefreshToken: exports.generateRefreshToken,
        verifyRefreshToken: verifyRefreshToken,
    };
};
exports.TokenService = TokenService;
const verifyRefreshToken = (token) => {
    jsonwebtoken_1.default.verify(token, config_1.default.server.token.refreshTokenSecret, (err, _user) => {
        if (err)
            return {
                message: err.message,
            };
    });
    const decoded = jsonwebtoken_1.default.decode(token);
    return {
        type: "success",
        payload: decoded,
    };
};
// durée de vie courte
const generateAccessToken = (user) => {
    try {
        const token = jsonwebtoken_1.default.sign({ user }, config_1.default.server.token.accessTokenSecret, {
            algorithm: "HS256",
            expiresIn: "1m",
        });
        return {
            type: "success",
            token: token,
        };
    }
    catch (error) {
        return (0, Error_1.createCatchErrorMessage)(error);
    }
};
exports.generateAccessToken = generateAccessToken;
// durée de vie longue
const generateRefreshToken = (user) => {
    try {
        const token = jsonwebtoken_1.default.sign({ user }, config_1.default.server.token.refreshTokenSecret, {
            algorithm: "HS256",
            expiresIn: "1y",
        });
        return {
            type: "success",
            token: token,
        };
    }
    catch (error) {
        return (0, Error_1.createCatchErrorMessage)(error);
    }
};
exports.generateRefreshToken = generateRefreshToken;
