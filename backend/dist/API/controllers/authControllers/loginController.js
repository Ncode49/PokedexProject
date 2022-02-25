"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const pg_1 = require("pg");
const config_1 = __importDefault(require("../../../config/config"));
const query_1 = require("../../postgre/query");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateToken_1 = require("../../functions/generateToken");
const login = async (req, res, next) => {
    // on recoit les données du login
    const { username, password } = req.body;
    // requete pour récupérer les users
    // si on en a trouvé, on compare
    // si pas ok => password incorrect
    // sinon password correct
    // cree le token
    // test si token est correctement crée ou non
    // compare the data to the hash data
    const client = new pg_1.Client(config_1.default.postgres);
    const query = {
        text: query_1.findUserByUsername,
        values: [username],
    };
    try {
        client.connect();
        const data = await client.query(query);
        const users = data.rows;
        if (!users.length)
            return res.status(401).json({
                message: "l'username n'existe pas en base de données",
            });
        const valid = await bcryptjs_1.default.compare(password, users[0].password);
        if (!valid)
            return res.status(401).json({
                message: "password mismatched",
            });
        const token = (0, generateToken_1.generateAccessToken)(username);
        return res.status(200).json({
            token: token,
            message: "OK",
        });
    }
    catch (error) {
        const err = error;
        return res.status(400).json({
            message: err.message,
        });
    }
};
exports.login = login;
