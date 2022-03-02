"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const pg_1 = require("pg");
const config_1 = __importDefault(require("../../config/config"));
// list of different dépendences
exports.client = new pg_1.Client(config_1.default.postgres);
