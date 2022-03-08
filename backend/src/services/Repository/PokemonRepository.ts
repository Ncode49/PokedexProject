import { createErrorMessage } from '..'
import { APIError, createSuccessMessage } from '../Error'
import { BaseRepositoryType } from './BaseRepository'
import { MessageS } from './utils'
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
export const PokemonRepository = (
  baseRepository: BaseRepositoryType
): PokemonRepositoryType => {
  return {
    getPokemonLikes: getPokemonLikes(baseRepository),
    addPokemonLike: addPokemonLike(baseRepository),
  }
}

const getPokemonLikes =
  (baseRepository: BaseRepositoryType) =>
  async (pokemonName: string): GetPokemonLikesResultType => {
    const transactionResult = await baseRepository.transaction<IPokemonLike>(
      async (client) => {
        const res = await client.query<IPokemonLike>({
          text: 'SELECT *  FROM pokemon WHERE name = $1',
          values: [pokemonName],
        })
        const { rows } = res
        if (rows.length == 0)
          return createErrorMessage(
            "le pokemon n'existe pas en base de données"
          )
        return {
          type: 'successPayload',
          result: res,
        }
      }
    )
    if (transactionResult.type == 'successPayload') {
      const { rows } = transactionResult.result
      return { type: 'success', like: rows[0].like }
    }
    if (transactionResult.type == 'error') return transactionResult
    return createErrorMessage("success sans payload n'existe pas")
  }

const addPokemonLike =
  (baseRepository: BaseRepositoryType) =>
  async (pokemonName: string, likeNumber: number): AddPokemonLikeResultType => {
    const res = await baseRepository.transaction<IPokemonLike>(
      async (client) => {
        const { rows } = await client.query<IPokemonLike>({
          text: 'SELECT * FROM pokemon WHERE name = $1',
          values: [pokemonName],
        })
        if (rows.length == 0) {
          if (likeNumber == -1)
            return createErrorMessage('nombre de like negatifs')
          await client.query({
            text: 'INSERT INTO pokemon("name", "like") VALUES($1, $2) RETURNING *',
            values: [pokemonName, 1],
          })
          return createSuccessMessage("l'utilisateur a été crée")
        }
        const newNumberLike = rows[0].like + likeNumber
        if (newNumberLike == 0) {
          await client.query({
            text: 'DELETE FROM pokemon WHERE name = $1',
            values: [pokemonName],
          })
          return createSuccessMessage('l utilisateur a ete supprime')
        } else {
          await client.query({
            text: 'UPDATE pokemon SET "like" = $1 WHERE "name" = $2 RETURNING *',
            values: [newNumberLike, pokemonName],
          })
          return createSuccessMessage(
            'le like a été correctement ajouté/supprime en base de données'
          )
        }
      }
    )
    if (res.type == 'successPayload')
      return createErrorMessage("success sans payload n'existe pas")
    return res
  }
