"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenService = void 0;
const services_1 = require("../../services");
const RefreshTokenService = (tokenservice) => {
    return {
        refreshToken: refreshToken(tokenservice),
    };
};
exports.RefreshTokenService = RefreshTokenService;
const refreshToken = (tokenService) => (token) => {
    try {
        const payload = tokenService.verifyRefreshToken(token);
        if (payload.type === "error")
            return payload;
        return tokenService.generateAccessToken(payload.payload.username);
    }
    catch (error) {
        return (0, services_1.createCatchErrorMessage)(error);
    }
};
