"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cryptService = void 0;
const compareHash_1 = require("./compareHash");
const hashPassword_1 = require("./hashPassword");
const cryptService = () => {
    return {
        hashPassword: hashPassword_1.hashPassword,
        compareHash: compareHash_1.compareHash,
    };
};
exports.cryptService = cryptService;
