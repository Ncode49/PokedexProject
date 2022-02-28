"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const query_1 = require("../../../postgre/query");
const queryService_1 = require("../queryService");
const registerUser = async (client, username, password) => {
    try {
        const hash = await bcryptjs_1.default.hash(password, 10);
        const query = {
            text: query_1.addUserPasswordQuery,
            values: [username, hash],
        };
        // service pour interaction bdd
        await (0, queryService_1.queryService)(client, query);
    }
    catch (error) {
        const err = error;
        await client.end();
        return {
            message: err.message,
        };
    }
    return {
        message: `le client ${username} a été correctemnt enregistré en base de données,`,
    };
};
exports.registerUser = registerUser;
