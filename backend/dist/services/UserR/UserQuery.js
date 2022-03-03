"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByUsername = exports.addUserPasswordQuery = exports.selectAllQuery = void 0;
exports.selectAllQuery = "select * from users";
exports.addUserPasswordQuery = "INSERT INTO users(username, password) VALUES($1, $2) RETURNING *";
exports.getUserByUsername = ;
