"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryService = void 0;
const queryService = async (client, query) => {
    try {
        // if client connect fail to the catch?
        await client.connect();
        await client.query(query);
        await client.end();
    }
    catch (error) {
        client.end();
        const err = error;
    }
};
exports.queryService = queryService;
