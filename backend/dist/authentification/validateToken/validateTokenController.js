"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateTokenController = void 0;
const ValidateTokenController = (res) => {
    console.log("pass in controller");
    return res.status(200).json({
        message: "Token(s) validated",
    });
};
exports.ValidateTokenController = ValidateTokenController;
