import { PoolClient } from 'pg'
import { createErrorMessage, IUser } from '..'
import { APIError, createSuccessMessage } from '../Error'
import { BaseRepositoryType } from './BaseRepository'
import { MessageS } from './utils'

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
export type LikeRepositoryType = {
  getPokemonLikes: (pokemonId: number) => GetPokemonLikesResultType
  addPokemonLike: (
    pokemonId: number,
    likeNumber: 1 | -1,
    username: string
  ) => AddPokemonLikeResultType
}
export const LikeRepository = (
  baseRepository: BaseRepositoryType
): LikeRepositoryType => {
  return {
    getPokemonLikes: getPokemonLikes(baseRepository),
    addPokemonLike: addPokemonLike(baseRepository),
  }
}

const getPokemonLikes =
  (baseRepository: BaseRepositoryType) =>
  async (pokemonId: number): GetPokemonLikesResultType => {
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

const addPokemonLike =
  (baseRepository: BaseRepositoryType) =>
  async (
    pokemonId: number,
    likeNumber: 1 | -1,
    username: string
  ): AddPokemonLikeResultType => {
    const res = await baseRepository.transaction(async (client) => {
      const user_uuid = await getUserUuid(client, username)
      const pokemonLikes = await getPokemonLike(client, pokemonId)
      if (pokemonLikes == 0 && likeNumber == -1) {
        return createErrorMessage('nombre de like finaux negatifs')
      }
      if (likeNumber == 1)
        return await addLikeEntry(client, pokemonId, user_uuid)
      return await deleteLikeEntry(client, pokemonId, user_uuid)
    })

    if (res.type == 'successPayload')
      return createErrorMessage("success sans payload n'existe pas")
    return res
  }

const getUserUuid = async (
  client: PoolClient,
  username: string
): Promise<string> => {
  const { rows } = await client.query<IUser>({
    text: 'SELECT "user_uuid" FROM "user" WHERE "username" = $1',
    values: [username],
  })
  return rows[0].user_uuid
}

const addLikeEntry = async (
  client: PoolClient,
  pokemonId: number,
  user_uuid: string
): Promise<MessageS> => {
  await client.query({
    text: 'INSERT INTO "like"("user_uuid","pokemon_id") VALUES($1,$2)',
    values: [user_uuid, pokemonId],
  })
  return createSuccessMessage(`le like a été ajouté du pokemon ${pokemonId}`)
}

const deleteLikeEntry = async (
  client: PoolClient,
  pokemonId: number,
  user_uuid: string
): Promise<MessageS> => {
  await client.query({
    text: 'DELETE FROM "like" WHERE user_uuid = $1 AND pokemon_id = $2',
    values: [user_uuid, pokemonId],
  })
  return createSuccessMessage(`le like a été enlevé du pokemon ${pokemonId}`)
}

const getPokemonLike = async (
  client: PoolClient,
  pokemonId: number
): Promise<number> => {
  const { rows } = await client.query<ICount>({
    text: 'SELECT COUNT(*) FROM "like" WHERE pokemon_id = $1',
    values: [pokemonId],
  })
  return rows[0].count
}
