"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthControllerDI = void 0;
const AuthControllerDI = (registerController, loginController, refreshTokenController, validateTokenController) => {
    return {
        register: registerController,
        login: loginController,
        refreshToken: refreshTokenController,
        validateToken: validateTokenController,
    };
};
exports.AuthControllerDI = AuthControllerDI;
