"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthControllerDI = void 0;
const registerController_1 = require("./register/registerController");
const validateTokenController_1 = require("./validateToken/validateTokenController");
const loginController_1 = require("./login/loginController");
const refreshTokenController_1 = require("./refreshToken/refreshTokenController");
const AuthControllerDI = (deps) => {
    return {
        register: (0, registerController_1.register)(deps.queryService, deps.cryptoService),
        login: (0, loginController_1.login)(deps.queryService, deps.cryptoService, deps.tokenService),
        refreshToken: (0, refreshTokenController_1.refreshToken)(deps.tokenService),
        validateToken: validateTokenController_1.validateTokenController,
    };
};
exports.AuthControllerDI = AuthControllerDI;
