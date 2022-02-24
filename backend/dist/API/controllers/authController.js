"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.validateToken = void 0;
const logging_1 = __importDefault(require("../../config/logging"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const pg_1 = require("pg");
const config_1 = __importDefault(require("../../config/config"));
const NAMESPACE = "Auth";
const selectAllQuery = "select * from users";
const addUserPasswordQuery = "";
const text = "INSERT INTO users(username, password) VALUES('salut', 'michel') RETURNING *";
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
    bcryptjs_1.default.hash(password, 10, (err, hash) => {
        if (err) {
            return res.status(401).json({
                message: err.message,
                error: err,
            });
        }
        const client = new pg_1.Client(config_1.default.postgres);
        client.connect(function (err) {
            if (err)
                throw err;
            console.log("Connected!");
        });
        client.query(selectAllQuery, (err, res) => {
            if (!err) {
                console.log(res.rows);
            }
            else {
                console.error(err.message);
            }
        });
    });
    // erreur lors de l'ecriture du hash
};
exports.register = register;
