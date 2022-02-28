"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthControllerDI = void 0;
const registerController_1 = require("./controllers/registerController");
// // definition du controller principal
const AuthControllerDI = (deps) => {
    return {
        register: (0, registerController_1.register)(deps.client, deps.registerService),
    };
};
exports.AuthControllerDI = AuthControllerDI;
