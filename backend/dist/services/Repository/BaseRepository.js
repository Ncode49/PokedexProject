"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
const __1 = require("..");
// fonction utilitaire pour les transactions et repository
const BaseRepository = () => {
    return transaction;
};
exports.BaseRepository = BaseRepository;
// T is the Promise coming from the client
const transaction = (pool) => async (f) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await f(client);
        await client.query('COMMIT');
        return {
            type: 'success',
            result: result,
        };
        result;
    }
    catch (e) {
        await client.query('ROLLBACK');
        return (0, __1.createCatchErrorMessage)(e);
    }
    finally {
        client.release();
    }
};
