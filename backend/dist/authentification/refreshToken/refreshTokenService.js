"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenService = void 0;
const Message_1 = require("../../services/ServiceType/Message");
const refreshTokenService = (tokenservice) => {
    return {
        refreshToken: refreshToken(tokenservice),
    };
};
exports.refreshTokenService = refreshTokenService;
const refreshToken = (tokenService) => (token) => {
    try {
        const payload = tokenService.verifyRefreshToken(token);
        if ("username" in payload) {
            return tokenService.generateAccessToken(payload.username);
        }
        if ("message" in payload)
            return payload;
        return (0, Message_1.createErrorMessage)("error refreshToken");
    }
    catch (error) {
        return (0, Message_1.createCatchErrorMessage)(error);
    }
};
