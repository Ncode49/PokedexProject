import { PoolClient } from 'pg'
import { createCatchErrorMessage, createErrorMessage, IUser } from '..'
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
export type PokemonIdListResult = {
  type: 'success'
  pokemons: ILike[]
}
export type AddPokemonLikeType = (
  pokemonId: number,
  likeNumber: 1 | -1,
  username: string
) => Promise<MessageS | APIError>
export type GetPokemonLikesType = (
  pokemonId: number
) => Promise<Likes | APIError>
export type GetUserLikedPokemonsLikeRepositoryType = (
  username: string
) => Promise<PokemonIdListResult | APIError>
export type LikeRepositoryType = {
  getPokemonLikes: GetPokemonLikesType
  addPokemonLike: AddPokemonLikeType
  getUserLikedPokemons: GetUserLikedPokemonsLikeRepositoryType
}

export const LikeRepository = (
  baseRepository: BaseRepositoryType
): LikeRepositoryType => {
  return {
    getPokemonLikes: getPokemonLikes(baseRepository),
    addPokemonLike: addPokemonLike(baseRepository),
    getUserLikedPokemons: getUserLikedPokemons(baseRepository),
  }
}
const getUserLikedPokemons =
  (baseRepository: BaseRepositoryType) => async (username: string) => {
    const transactionresult = await baseRepository.transaction<ILike>(
      async (client) => {
        const user_uuid = await getUserUuid(client, username)

        const res = await client.query<ILike>({
          text: 'SELECT pokemon_id FROM "like" WHERE user_uuid = $1',
          values: [user_uuid],
        })
        return {
          type: 'successPayload',
          result: res,
        }
      }
    )
    if (transactionresult.type == 'successPayload') {
      const { rows } = transactionresult.result
      const ret: PokemonIdListResult = { type: 'success', pokemons: rows }
      return ret
    }
    if (transactionresult.type == 'success')
      return createCatchErrorMessage('success sans payload impossible')
    return transactionresult
  }

const getPokemonLikes =
  (baseRepository: BaseRepositoryType): GetPokemonLikesType =>
  async (pokemonId: number) => {
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
  (baseRepository: BaseRepositoryType): AddPokemonLikeType =>
  async (pokemonId: number, likeNumber: 1 | -1, username: string) => {
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
  return createSuccessMessage(`le like a ??t?? ajout?? du pokemon ${pokemonId}`)
}

const deleteLikeEntry = async (
  client: PoolClient,
  pokemonId: number,
  user_uuid: string
): Promise<MessageS> => {
  const { rows } = await client.query({
    text: 'DELETE FROM "like" WHERE user_uuid = $1 AND pokemon_id = $2',
    values: [user_uuid, pokemonId],
  })
  return createSuccessMessage(`le like a ??t?? enlev?? du pokemon ${pokemonId}`)
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
