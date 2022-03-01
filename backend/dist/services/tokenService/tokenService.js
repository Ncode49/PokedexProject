"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config/config"));
const tokenService = () => {
    return {
        generateAccessToken: generateAccessToken,
        generateRefreshToken: generateRefreshToken,
        verifyRefreshToken: verifyRefreshToken,
    };
};
exports.tokenService = tokenService;
const verifyRefreshToken = (token) => {
    jsonwebtoken_1.default.verify(token, config_1.default.server.token.refreshTokenSecret, (err, _user) => {
        if (err)
            return {
                message: err.message,
            };
    });
    const decoded = jsonwebtoken_1.default.decode(token);
    return decoded;
};
// durée de vie courte
const generateAccessToken = (user) => {
    try {
        return jsonwebtoken_1.default.sign({ user }, config_1.default.server.token.accessTokenSecret, {
            algorithm: "HS256",
            expiresIn: "1m",
        });
    }
    catch (error) {
        const err = error;
        return {
            message: err.message,
        };
    }
};
// durée de vie longue
const generateRefreshToken = (user) => {
    try {
        return jsonwebtoken_1.default.sign({ user }, config_1.default.server.token.refreshTokenSecret, {
            algorithm: "HS256",
            expiresIn: "1y",
        });
    }
    catch (error) {
        const err = error;
        return {
            message: err.message,
        };
    }
};
