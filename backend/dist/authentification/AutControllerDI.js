"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthControllerDI = void 0;
const registerController_1 = require("./controllers/registerController");
const validateController_1 = require("./controllers/validateController");
const loginController_1 = require("./controllers/loginController");
const refreshTokenController_1 = require("./controllers/refreshTokenController");
// // definition du controller principal
const AuthControllerDI = (deps) => {
    return {
        register: (0, registerController_1.register)(deps.queryService, deps.cryptoService),
        login: (0, loginController_1.login)(deps.queryService, deps.cryptoService, deps.tokenService),
        refreshToken: (0, refreshTokenController_1.refreshToken)(deps.tokenService),
        validateToken: validateController_1.validateToken,
    };
};
exports.AuthControllerDI = AuthControllerDI;
