"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.validateToken = void 0;
const logging_1 = __importDefault(require("../../../config/logging"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const pg_1 = require("pg");
const config_1 = __importDefault(require("../../../config/config"));
const query_1 = require("../../postgre/query");
const NAMESPACE = "Auth register";
const validateToken = (req, res, next) => {
    logging_1.default.info(NAMESPACE, "Token validated authorized");
    return res.status(200).json({
        message: "Authorized",
    });
};
exports.validateToken = validateToken;
const register = (req, res, next) => {
    // on recoit les données de l'inscription
    const { username, password } = req.body;
    bcryptjs_1.default.hash(password, 10, async (err, hash) => {
        if (err) {
            return res.status(401).json({
                message: err.message,
                error: err,
            });
        }
        const client = new pg_1.Client(config_1.default.postgres);
        const query = {
            text: query_1.addUserPasswordQuery,
            values: [username, hash],
        };
        let message = "";
        try {
            await client.connect();
            const res = await client.query(query);
        }
        catch (error) {
            const err = error;
            message = err.message;
        }
        finally {
            client.end();
        }
        return res.status(200).json({
            message: message,
        });
    });
};
exports.register = register;
