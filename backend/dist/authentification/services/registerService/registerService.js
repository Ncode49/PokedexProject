"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerService = void 0;
const registerUser_1 = require("./registerUser");
const registerService = (deps) => {
    return {
        registerUser: (0, registerUser_1.registerUser)(deps.queryService),
    };
};
exports.registerService = registerService;
