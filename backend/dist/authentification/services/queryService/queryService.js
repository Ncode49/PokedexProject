"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryService = void 0;
const addUser_1 = require("./addUser");
const queryService = (deps) => {
    return { addUser: (0, addUser_1.addUser)(deps.client) };
};
exports.queryService = queryService;
