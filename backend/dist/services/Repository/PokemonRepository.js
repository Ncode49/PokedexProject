"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokemonRepository = void 0;
const Error_1 = require("../Error");
const PokemonRepository = (baseRepository) => {
    return {
        getPokemonLikes: getPokemonLikes(baseRepository),
        addPokemonLike: addPokemonLike(baseRepository),
    };
};
exports.PokemonRepository = PokemonRepository;
const getPokemonLikes = (baseRepository) => async (pokemonName) => {
    const transactionResult = await baseRepository.transaction((client) => {
        return client.query({
            text: 'SELECT *  FROM pokemon WHERE name = $1',
            values: [pokemonName],
        });
    });
    if (transactionResult.type == 'error')
        return transactionResult;
    const { rows } = transactionResult.result;
    if (rows.length == 0) {
        return {
            type: 'error',
            message: "le pokemon n'existe pas en base de données",
        };
    }
    return { type: 'success', like: rows[0].like };
};
// function not finished
const addPokemonLike = (pool) => async (pokemonName, likeNumber) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const pokemonReturn = await client.query({
            text: 'SELECT * FROM pokemon WHERE name = $1',
            values: [pokemonName],
        });
        const { rows } = pokemonReturn;
        if (rows.length == 0) {
            console.log("l'utilisateur n'existe pas en base de données");
            if (likeNumber == -1)
                return {
                    type: 'error',
                    message: 'nombre de like negatifs',
                };
            else {
                const addPokemonQuery = {
                    text: 'INSERT INTO pokemon("name", "like") VALUES($1, $2) RETURNING *',
                    values: [pokemonName, 1],
                };
                const res = await client.query(addPokemonQuery);
                await client.query('COMMIT');
                return {
                    type: 'success',
                    message: "l'utilisateur a été crée",
                };
            }
        }
        // pokemon == -1 => error
        const newNumberLike = rows[0].like + likeNumber;
        if (newNumberLike == 0) {
            await client.query({
                text: 'DELETE FROM pokemon WHERE name = $1',
                values: [pokemonName],
            });
            await client.query('COMMIT');
            return {
                type: 'success',
                message: 'l utilisateur a ete supprime',
            };
        }
        else {
            await client.query({
                text: 'UPDATE pokemon SET "like" = $1 WHERE "name" = $2 RETURNING *',
                values: [newNumberLike, pokemonName],
            });
            await client.query('COMMIT');
        }
        // on l'ajoute en base de données
        const success = {
            type: 'success',
            message: 'le like a été correctement ajouté/supprime en base de données',
        };
        return success;
    }
    catch (error) {
        await client.query('ROLLBACK');
        return (0, Error_1.createCatchErrorMessage)(error);
    }
    finally {
        client.release();
    }
};
