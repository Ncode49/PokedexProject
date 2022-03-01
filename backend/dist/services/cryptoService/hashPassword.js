"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const hashPassword = async (password) => {
    try {
        const hash = await bcryptjs_1.default.hash(password, 10);
    }
    catch (error) {
        const err = error;
        return {};
    }
    return hash;
};
exports.hashPassword = hashPassword;
