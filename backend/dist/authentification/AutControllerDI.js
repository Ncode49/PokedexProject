"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthControllerDI = void 0;
const registerController_1 = require("./controllers/registerController");
const validateController_1 = require("./controllers/validateController");
// // definition du controller principal
const AuthControllerDI = (deps) => {
    return {
        register: (0, registerController_1.register)(deps.registerService),
        login: login(deps.queryService, deps.cryptoService, deps.tokenService),
        validateToken: validateController_1.validateToken,
    };
};
exports.AuthControllerDI = AuthControllerDI;
