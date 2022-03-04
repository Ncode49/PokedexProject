"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokemonRepository = void 0;
const __1 = require("..");
const utils_1 = require("./utils");
const PokemonRepository = (pool) => {
    return {
        getPokemonLikes: getPokemonLikes(pool),
        addPokemonLike: addPokemonLike(pool),
    };
};
exports.PokemonRepository = PokemonRepository;
const getPokemonLikes = (pool) => async (pokemonName) => {
    const transactionResult = await (0, utils_1.oneTransaction)(pool, {
        text: "SELECT *  FROM pokemon WHERE name = $1",
        values: [pokemonName],
    });
    if (transactionResult.type == "error")
        return transactionResult;
    const { rows } = transactionResult.queryReturn;
    if (rows.length == 0) {
        const error = {
            type: "error",
            message: "le pokemon n'existe pas en base de données",
        };
        return error;
    }
    const likeResult = { type: "success", like: rows[0].like };
    console.log(likeResult);
    return likeResult;
};
// function not finished
const addPokemonLike = (pool) => async (pokemonName, likeNumber) => {
    let result = {};
    const client = await pool.connect();
    try {
        await client.query("BEGIN");
        const query = {
            text: "SELECT * FROM pokemon WHERE name = $1",
            values: [pokemonName],
        };
        const queryReturn = await client.query(query);
        const { rows } = queryReturn;
        if (rows.length == 0) {
            console.log("l'utilisateur n'existe pas en base de données");
            if (likeNumber == -1)
                result = {
                    type: "error",
                    message: "nombre de like negatifs",
                };
            const addPokemonQuery = {
                text: "INSERT INTO pokemon(name,like) VALUES($1, $2) RETURNING *",
                values: [pokemonName, 1],
            };
            await client.query(addPokemonQuery);
            // pokemon == -1 => error
        }
        const numberLikes = rows[0].like;
        const sum = numberLikes + likeNumber;
        if (sum == 0) {
            const deletePokemon = {
                text: "DELETE FROM pokemon WHERE name = $1",
                values: [pokemonName],
            };
            await client.query(deletePokemon);
            console.log("on le supprime de la bdd");
        }
        else {
            const updateLikePokemon = {
                text: "UPDATE pokemon SET like = $1 WHERE name = $2 RETURNING *",
                values: [sum, pokemonName],
            };
            await client.query(updateLikePokemon);
            console.log("on a update le client");
        }
        // on l'ajoute en base de données
        await client.query("COMMIT");
        const success = {
            type: "success",
            message: "le like a été correctement ajouté en base de données",
        };
        return success;
    }
    catch (error) {
        await client.query("ROLLBACK");
        return (0, __1.createCatchErrorMessage)(error);
    }
    finally {
        client.release();
    }
};
