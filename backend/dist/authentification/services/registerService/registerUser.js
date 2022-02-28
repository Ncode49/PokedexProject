"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const query_1 = require("../../../postgre/query");
const registerUser = (queryService) => async (username, password) => {
    try {
        const hash = await bcryptjs_1.default.hash(password, 10);
        const query = {
            text: query_1.addUserPasswordQuery,
            values: [username, hash],
        };
        // service pour interaction bdd
        const mess = await queryService.addUser(query);
        return { message: mess.message };
    }
    catch (error) {
        const err = error;
        return {
            message: err.message,
        };
    }
};
exports.registerUser = registerUser;
