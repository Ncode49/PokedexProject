import { Pool, QueryResult } from "pg";
import { APIError, createCatchErrorMessage } from "..";
import { MessageS, oneTransaction } from "./utils";
export type IPokemonLike = {
  name: string;
  like: number;
};
export type Likes = {
  type: "success";
  like: number;
};
export type AddPokemonLikeResultType = Promise<MessageS | APIError>;
export type GetPokemonLikesResultType = Promise<Likes | APIError>;
export type PokemonRepositoryType = {
  getPokemonLikes: (pokemonName: string) => GetPokemonLikesResultType;
  addPokemonLike: (
    pokemonName: string,
    likeNumber: number
  ) => AddPokemonLikeResultType;
};
export const PokemonRepository = (pool: Pool): PokemonRepositoryType => {
  return {
    getPokemonLikes: getPokemonLikes(pool),
    addPokemonLike: addPokemonLike(pool),
  };
};

const getPokemonLikes = (pool: Pool) => async (pokemonName: string) => {
  const transactionResult = await oneTransaction<IPokemonLike>(pool, {
    text: "SELECT *  FROM pokemon WHERE name = $1",
    values: [pokemonName],
  });
  if (transactionResult.type == "error") return transactionResult;
  const { rows } = transactionResult.queryReturn;
  if (rows.length == 0) {
    const error: APIError = {
      type: "error",
      message: "le pokemon n'existe pas en base de données",
    };
    return error;
  }
  const likeResult: Likes = { type: "success", like: rows[0].like };
  console.log(likeResult);
  return likeResult;
};

// function not finished
const addPokemonLike =
  (pool: Pool) => async (pokemonName: string, likeNumber: number) => {
    let result = {};
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const query = {
        text: "SELECT * FROM pokemon WHERE name = $1",
        values: [pokemonName],
      };
      const queryReturn: QueryResult<IPokemonLike> =
        await client.query<IPokemonLike>(query);
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
      } else {
        const updateLikePokemon = {
          text: "UPDATE pokemon SET like = $1 WHERE name = $2 RETURNING *",
          values: [sum, pokemonName],
        };
        await client.query(updateLikePokemon);
        console.log("on a update le client");
      }
      // on l'ajoute en base de données
      await client.query("COMMIT");
      const success: MessageS = {
        type: "success",
        message: "le like a été correctement ajouté en base de données",
      };
      return success;
    } catch (error) {
      await client.query("ROLLBACK");
      return createCatchErrorMessage(error);
    } finally {
      client.release();
    }
  };
