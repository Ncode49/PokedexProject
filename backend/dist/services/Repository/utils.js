"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oneTransaction = exports.transaction = void 0;
const __1 = require("..");
const transaction = async (pool, f) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await f(client);
        await client.query('COMMIT');
        return {
            type: 'success',
            queryReturn: result,
        };
    }
    catch (error) {
        await client.query('ROLLBACK');
        return (0, __1.createCatchErrorMessage)(error);
    }
    finally {
        client.release();
    }
};
exports.transaction = transaction;
const oneTransaction = async (pool, query) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const queryReturn = await client.query(query);
        await client.query('COMMIT');
        return {
            type: 'success',
            queryReturn: queryReturn,
        };
    }
    catch (error) {
        await client.query('ROLLBACK');
        return (0, __1.createCatchErrorMessage)(error);
    }
    finally {
        client.release();
    }
};
exports.oneTransaction = oneTransaction;
