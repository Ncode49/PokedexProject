"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config/config"));
const verifyRefreshToken = (token) => {
    jsonwebtoken_1.default.verify(token, config_1.default.server.token.refreshTokenSecret, (err, user) => {
        if (err)
            return { message: err.message };
    });
    const decoded = jsonwebtoken_1.default.decode(token);
    return decoded;
};
exports.verifyRefreshToken = verifyRefreshToken;
