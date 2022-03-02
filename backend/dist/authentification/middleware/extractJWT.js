"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Error_1 = require("../../services/Error");
// 401 unauthorized
const extractJWT = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null)
        return res.sendStatus(401);
    jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET, (err, _user) => {
        if (err)
            return res.sendStatus(403);
        next();
    });
    return res.status(401).json((0, Error_1.createErrorMessage)("No token UnAuthorized"));
};
exports.extractJWT = extractJWT;
