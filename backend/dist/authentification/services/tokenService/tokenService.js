"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenService = void 0;
const generateToken_1 = require("./generateToken");
const tokenService = () => {
    return {
        generateAccessToken: generateToken_1.generateAccessToken,
        generateRefreshToken: generateToken_1.generateRefreshToken,
    };
};
exports.tokenService = tokenService;
