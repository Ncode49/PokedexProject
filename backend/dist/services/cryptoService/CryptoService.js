"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Error_1 = require("../Error");
const CryptService = () => {
    return {
        hashPassword: hashPassword,
        compareHash: compareHash,
    };
};
exports.CryptService = CryptService;
const compareHash = async (password, hash) => {
    try {
        const bool = await bcryptjs_1.default.compare(password, hash);
        return {
            type: 'success',
            bool: bool,
        };
    }
    catch (error) {
        return (0, Error_1.createCatchErrorMessage)(error);
    }
};
const hashPassword = async (password) => {
    try {
        const hash = await bcryptjs_1.default.hash(password, 10);
        return {
            type: 'success',
            hash: hash,
        };
    }
    catch (error) {
        return (0, Error_1.createCatchErrorMessage)(error);
    }
};
