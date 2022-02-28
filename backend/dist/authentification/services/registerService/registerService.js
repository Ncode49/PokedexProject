"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerService = void 0;
const registerUser_1 = require("./registerUser");
const registerService = () => {
    return {
        registerUser: registerUser_1.registerUser,
    };
};
exports.registerService = registerService;
