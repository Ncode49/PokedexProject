"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const logging_1 = __importDefault(require("../config/logging"));
const NAMESPACE = "Auth";
// 401 unauthorized
const extractJWT = (req, res, next) => {
    logging_1.default.info(NAMESPACE, "Validate Token");
    // Bearer token data form
    let token = req.headers.authorization?.split(" ")[1];
    // faire try and catch a la place
    if (token) {
        // on a besoin de la clé secrete et du token, teste si 3eme partie du token (signature) correspond bien a l'algorithme
        // Algo(header + payload + cle secrete)
        try {
            jsonwebtoken_1.default.verify(token, config_1.default.server.token.accessTokenSecret);
            next();
        }
        catch (error) {
            const err = error;
            return res.status(401).json({
                message: err.message,
                error: error,
            });
        }
    }
    // pas de token donc pas authorisé
    else {
        return res.status(401).json({
            message: "No token UnAuthorized",
        });
    }
};
exports.extractJWT = extractJWT;
