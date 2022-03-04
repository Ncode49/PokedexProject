import { Pool, PoolClient, QueryResult } from 'pg'
import { APIError, createCatchErrorMessage } from '../Error'
import { MessageS, oneTransaction, transaction } from './utils'
export type IPokemonLike = {
  name: string
  like: number
}
export type Likes = {
  type: 'success'
  like: number
}
export type AddPokemonLikeResultType = Promise<MessageS | APIError>
export type GetPokemonLikesResultType = Promise<Likes | APIError>
export type PokemonRepositoryType = {
  getPokemonLikes: (pokemonName: string) => GetPokemonLikesResultType
  addPokemonLike: (
    pokemonName: string,
    likeNumber: number
  ) => AddPokemonLikeResultType
}
export const PokemonRepository = (pool: Pool): PokemonRepositoryType => {
  return {
    getPokemonLikes: getPokemonLikes(pool),
    addPokemonLike: addPokemonLike(pool),
  }
}

const getPokemonLikes =
  (pool: Pool) =>
  async (pokemonName: string): GetPokemonLikesResultType => {
    const transactionResult = await oneTransaction<IPokemonLike>(pool, {
      text: 'SELECT *  FROM pokemon WHERE name = $1',
      values: [pokemonName],
    })

    if (transactionResult.type == 'error') return transactionResult
    const { rows } = transactionResult.queryReturn
    if (rows.length == 0) {
      const error: APIError = {
        type: 'error',
        message: "le pokemon n'existe pas en base de données",
      }
      return error
    }
    const likeResult: Likes = { type: 'success', like: rows[0].like }
    return likeResult
  }

// function not finished
const addPokemonLike =
  (pool: Pool) =>
  async (pokemonName: string, likeNumber: number): AddPokemonLikeResultType => {
    const client = await pool.connect()
    try {
      await client.query('BEGIN')
      const pokemonReturn = await client.query<IPokemonLike>({
        text: 'SELECT * FROM pokemon WHERE name = $1',
        values: [pokemonName],
      })
      const { rows } = pokemonReturn
      if (rows.length == 0) {
        console.log("l'utilisateur n'existe pas en base de données")
        if (likeNumber == -1)
          return {
            type: 'error',
            message: 'nombre de like negatifs',
          }
        else {
          const addPokemonQuery = {
            text: 'INSERT INTO pokemon("name", "like") VALUES($1, $2) RETURNING *',
            values: [pokemonName, 1],
          }
          const res = await client.query<any>(addPokemonQuery)
          await client.query('COMMIT')
          return {
            type: 'success',
            message: "l'utilisateur a été crée",
          }
        }
      }
      // pokemon == -1 => error
      const newNumberLike = rows[0].like + likeNumber
      if (newNumberLike == 0) {
        await client.query({
          text: 'DELETE FROM pokemon WHERE name = $1',
          values: [pokemonName],
        })
        await client.query('COMMIT')
        return {
          type: 'success',
          message: 'l utilisateur a ete supprime',
        }
      } else {
        await client.query({
          text: 'UPDATE pokemon SET "like" = $1 WHERE "name" = $2 RETURNING *',
          values: [newNumberLike, pokemonName],
        })
        await client.query('COMMIT')
      }
      // on l'ajoute en base de données
      const success: MessageS = {
        type: 'success',
        message:
          'le like a été correctement ajouté/supprime en base de données',
      }
      return success
    } catch (error) {
      await client.query('ROLLBACK')
      return createCatchErrorMessage(error)
    } finally {
      client.release()
    }
  }
