"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../../config/config"));
const refreshToken = (req, res) => {
    // get the token
    let token = req.headers.authorization?.split(" ")[1];
    if (token) {
        // on a besoin de la clé secrete et du token, teste si 3eme partie du token (signature) correspond bien a l'algorithme
        // Algo(header + payload + cle secrete)
        jsonwebtoken_1.default.verify(token, config_1.default.server.token.refreshTokenSecret, (error, payload) => {
            if (error) {
                // token incorrect
                return res.status(401).json({
                    message: error.message,
                    error: error,
                });
            }
            // TODO verifier que l'utilisateur est toujours en bdd a toujours les droits
            // on teste ici que le user existe toujours
        });
    }
    // pas de token donc pas authorisé
    else {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }
    return res.status(200).json({
        message: "refreshToken ok",
    });
};
exports.refreshToken = refreshToken;
