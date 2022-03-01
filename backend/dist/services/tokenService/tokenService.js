"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenService = void 0;
const generateToken_1 = require("./generateToken");
const verifyRefreshToken_1 = require("./verifyRefreshToken");
const tokenService = () => {
    return {
        generateAccessToken: generateToken_1.generateAccessToken,
        generateRefreshToken: generateToken_1.generateRefreshToken,
        verifyRefreshToken: verifyRefreshToken_1.verifyRefreshToken,
    };
};
exports.tokenService = tokenService;
