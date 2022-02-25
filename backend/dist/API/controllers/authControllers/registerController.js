"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const pg_1 = require("pg");
const config_1 = __importDefault(require("../../../config/config"));
const query_1 = require("../../postgre/query");
const NAMESPACE = "Auth register";
const register = (req, res, next) => {
    // on recoit les données de l'inscription
    const { username, password } = req.body;
    const hash = bcryptjs_1.default.hash(password, 10, async (err, hash) => {
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
        try {
            await client.connect();
            const res = await client.query(query);
            await client.end();
        }
        catch (error) {
            const err = error;
            return res.status(404).json({
                message: err.message,
                error: err,
            });
        }
        return res.status(200).json({
            message: "OK",
        });
    });
};
exports.register = register;
