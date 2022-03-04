import { query } from "express";
import { Pool, QueryResult } from "pg";
import { APIError, createCatchErrorMessage } from "..";
import { MessageS, oneTransaction } from "./utils";
export type IPokemonLike = {
  name: string;
  likes: number;
};
export type Likes = {
  type: "success";
  likes: number;
};
export type AddPokemonLikeResultType = Promise<MessageS | APIError>;
export type GetPokemonLikesResultType = Promise<Likes | APIError>;
export type LikeRepositoryType = {
  getPokemonLikes: (pokemonName: string) => GetPokemonLikesResultType;
  addPokemonLike: (
    pokemonName: string,
    likeNumber: number
  ) => AddPokemonLikeResultType;
};
export const LikeRepository = (pool: Pool): LikeRepositoryType => {
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
  const likeResult: Likes = { type: "success", likes: rows[0].likes };
  return likeResult;
};

// make a double return
const addPokemonLike =
  (pool: Pool) => async (pokemonName: string, likeNumber: number) => {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");
      const query = {
        text: "SELECT *  FROM users WHERE name = $1",
        values: [pokemonName],
      };
      const queryReturn: QueryResult<IPokemonLike> =
        await client.query<IPokemonLike>(query);
      const { rows } = queryReturn;
      if (rows.length == 0) {
        console.log("l'utilisateur n'existe pas en base de données");
        // pokemon == -1 => error
      }
      // cas = 1, cas = -1
      const numberLikes = rows[0].likes;
      const sum = numberLikes + likeNumber;
      if (sum == 0) {
        console.log("on le supprime de la bdd");
      }
      // on l'ajoute en base de données
      await client.query("COMMIT");
      return {
        type: "success",
        queryReturn: queryReturn,
      };
    } catch (error) {
      await client.query("ROLLBACK");
      return createCatchErrorMessage(error);
    } finally {
      client.release();
    }
  };
