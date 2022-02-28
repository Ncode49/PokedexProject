"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
const validateToken = (res) => {
    return res.status(200).json({
        message: "Token(s) validated",
    });
};
exports.validateToken = validateToken;
