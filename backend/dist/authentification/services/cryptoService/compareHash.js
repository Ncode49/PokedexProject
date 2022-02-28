"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareHash = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const compareHash = async (password, hash) => {
    const valid = await bcryptjs_1.default.compare(password, hash);
    if (valid)
        return { message: "mot de passe correct" };
    return { message: "mot de passe incorrect" };
};
exports.compareHash = compareHash;
