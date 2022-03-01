"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cryptService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Error_1 = require("../ServiceType/Error");
const cryptService = () => {
    return {
        hashPassword: hashPassword,
        compareHash: compareHash,
    };
};
exports.cryptService = cryptService;
const compareHash = async (password, hash) => {
    try {
        return await bcryptjs_1.default.compare(password, hash);
    }
    catch (error) {
        return (0, Error_1.createCatchErrorMessage)(error);
    }
};
const hashPassword = async (password) => {
    try {
        return await bcryptjs_1.default.hash(password, 10);
    }
    catch (error) {
        return (0, Error_1.createCatchErrorMessage)(error);
    }
};
