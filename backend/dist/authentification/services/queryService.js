"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryService = void 0;
const addUser_1 = require("./queryService/addUser");
const queryService = async () => {
    return {
        addUser: addUser_1.addUser,
    };
};
exports.queryService = queryService;
