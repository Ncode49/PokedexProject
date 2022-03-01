"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTokenController = void 0;
const validateTokenController = (res) => {
    return res.status(200).json({
        message: "Token(s) validated",
    });
};
exports.validateTokenController = validateTokenController;
