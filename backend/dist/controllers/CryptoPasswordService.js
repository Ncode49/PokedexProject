"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoPasswordService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class CryptoPasswordService {
    constructor() { }
    async comparePasswordHash(password, hash) {
        try {
            const valid = await bcryptjs_1.default.compare(password, hash);
            if (valid) {
                return valid;
            }
        }
        catch (error) {
            // erreur du service 500 ??
        }
    }
}
exports.CryptoPasswordService = CryptoPasswordService;
