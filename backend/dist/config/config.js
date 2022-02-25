"use strict";
// trouver lib qui gère cela
Object.defineProperty(exports, "__esModule", { value: true });
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";
const SERVER_PORT = process.env.SERVER_PORT || 3000;
const SERVER_ACCESS_TOKEN_SECRET = process.env.SERVER_ACCESS_TOKEN_SECRET ||
    "355B1BBFC96725CDCE8F4A2708FDA310A80E6D13315AEC4E5EED2A75FE8032CE";
const SERVER_REFRESH_TOKEN_SECRET = process.env.SERVER_REFRESH_TOKEN_SECRET || "refreshToken";
const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
    token: {
        accessTokenSecret: SERVER_ACCESS_TOKEN_SECRET,
        refreshTokenSecret: SERVER_REFRESH_TOKEN_SECRET,
    },
};
const POSTGRES = {
    user: process.env.POSTGRES_USER || "postgres",
    host: process.env.POSTGRES_HOST || "localhost",
    database: process.env.POSTGRES_DATABASE || "postgres",
    password: process.env.POSTGRES_PASSWORD || "Tching@43@",
    port: 5432,
};
const config = {
    server: SERVER,
    postgres: POSTGRES,
};
exports.default = config;
