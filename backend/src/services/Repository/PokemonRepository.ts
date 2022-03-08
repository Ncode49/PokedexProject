import { createErrorMessage, IUser } from '..'
import { APIError, createSuccessMessage } from '../Error'
import { BaseRepositoryType } from './BaseRepository'
import { MessageS } from './utils'
export type IPokemon = {
  id: number
  name: string
}
export type ILike = {
  user_uuid: string
  pokemon_id: string
}
export type ICount = {
  count: number
}
export type Likes = {
  type: 'success'
  like: number
}
export type AddPokemonLikeResultType = Promise<MessageS | APIError>
export type GetPokemonLikesResultType = Promise<Likes | APIError>
export type PokemonRepositoryType = {
  getPokemonLikes: (pokemonId: number) => GetPokemonLikesResultType
  addPokemonLike: (
    id: number,
    pokemonName: string,
    likeNumber: number,
    username: string
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
  async (pokemonId: number): GetPokemonLikesResultType => {
    console.log('here')
    const transactionResult = await baseRepository.transaction(
      async (client) => {
        const res = await client.query<ICount>({
          text: 'SELECT COUNT(*) FROM "like" WHERE pokemon_id = $1',
          values: [pokemonId],
        })
        return {
          type: 'successPayload',
          result: res,
        }
      }
    )
    if (transactionResult.type == 'successPayload') {
      const { rows } = transactionResult.result
      return { type: 'success', like: rows[0].count }
    }
    if (transactionResult.type == 'error') return transactionResult
    return createErrorMessage("success sans payload n'existe pas")
  }
// we need the username
const addPokemonLike =
  (baseRepository: BaseRepositoryType) =>
  async (
    pokemonId: number,
    pokemonName: string,
    likeNumber: number,
    username: string
  ): AddPokemonLikeResultType => {
    const res = await baseRepository.transaction(async (client) => {
      const { rows } = await client.query({
        text: 'SELECT * FROM "like" WHERE pokemon_id = $1',
        values: [pokemonId],
      })
      if (rows.length == 0) {
        if (likeNumber == -1)
          return createErrorMessage('nombre de like negatifs')
        // on cree le pokemon dans la table pokemon
        await client.query({
          text: 'INSERT INTO "pokemon"("id", "name") VALUES($1, $2) RETURNING *',
          values: [pokemonId, pokemonName],
        })
        // on cree le lien dans la table like
        // d'abord, on recupere l'uuid dans la premiere table
        const { rows } = await client.query<IUser>({
          text: 'SELECT "user_uuid" FROM "user" WHERE "username" = $1',
          values: [username],
        })
        const user_uuid = rows[0].user_uuid
        await client.query({
          text: 'INSERT INTO "like"("user_uuid","pokemon_id") VALUES($1,$2)',
          values: [user_uuid, pokemonId],
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
    })
    if (res.type == 'successPayload')
      return createErrorMessage("success sans payload n'existe pas")
    return res
  }
