"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryService = void 0;
const addUser_1 = require("./addUser");
const findUser_1 = require("./findUser");
const queryService = (deps) => {
    return {
        addUser: (0, addUser_1.addUser)(deps.client),
        findUser: (0, findUser_1.findUser)(deps.client),
    };
};
exports.queryService = queryService;
