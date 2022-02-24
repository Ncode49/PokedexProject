"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config/config"));
const logging_1 = __importDefault(require("../../config/logging"));
const NAMESPACE = "Auth";
// 401 unauthorized
const extractJWT = (req, res, next) => {
    logging_1.default.info(NAMESPACE, "Validate Token");
    // Bearer token data form
    let token = req.headers.authorization?.split(" ")[1];
    if (token) {
        // on a besoin de la clé secrete et du token, teste si 3eme partie du token (signature) correspond bien a l'algorithme
        // Algo(header + payload + cle secrete)
        jsonwebtoken_1.default.verify(token, config_1.default.server.token.secret, (error, decoded) => {
            if (error) {
                // token incorrect
                return res.status(401).json({
                    message: error.message,
                    error: error,
                });
            }
            else {
                // create a 'jwt'= decoded that last the time of the request
                res.locals.jwt = decoded;
                // passe au prochain middleware
                next();
            }
        });
    }
    // pas de token donc pas authorisé
    else {
        return res.status(401).json({
            message: "UnAuthorized",
        });
    }
};
exports.default = extractJWT;
