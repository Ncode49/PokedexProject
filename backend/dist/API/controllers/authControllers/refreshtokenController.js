"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../../config/config"));
const generateToken_1 = require("../../functions/generateToken");
const refreshToken = (req, res) => {
    // get the token
    const token = req.headers.authorization?.split(" ")[1];
    if (token == null) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }
    // TODO Verifier que la personne a toujours les droits
    jsonwebtoken_1.default.verify(token, config_1.default.server.token.refreshTokenSecret, (err, user) => {
        if (err) {
            return res.status(401).json({
                message: err.message,
                err: err,
            });
        }
        const decoded = jsonwebtoken_1.default.decode(token);
        const accessToken = (0, generateToken_1.generateAccessToken)(decoded.username);
        res.status(200).json({
            accessToken: accessToken,
        });
    });
};
exports.refreshToken = refreshToken;
