import { PoolClient } from 'pg'
import { createCatchErrorMessage, createErrorMessage, IUser } from '..'
import { APIError, createSuccessMessage } from '../Error'
import { BaseRepositoryType } from './BaseRepository'
import { MessageS, transactionPayloadSuccess } from './utils'

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
export type PokemonIdListResultSuccess = {
  type: 'success'
  pokemons: ILike[]
}
export type AddPokemonLikeType = (
  user_uuid: string,
  pokemonId: number
) => Promise<MessageS | APIError>
export type GetPokemonLikesType = (
  pokemonId: number
) => Promise<Likes | APIError>
export type GetUserLikedPokemonsLikeRepositoryType = (
  username: string
) => Promise<PokemonIdListResultSuccess | APIError>
export type LikeRepositoryType = {
  getPokemonLikes: GetPokemonLikesType
  addPokemonLike: AddPokemonLikeType
  removePokemonLike: AddPokemonLikeType
  getUserLikedPokemons: GetUserLikedPokemonsLikeRepositoryType
}

export const LikeRepository = (
  baseRepository: BaseRepositoryType
): LikeRepositoryType => {
  return {
    getPokemonLikes: getPokemonLikes(baseRepository),
    addPokemonLike: addPokemonLike(baseRepository),
    removePokemonLike: removePokemonLike(baseRepository),
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
        return transactionPayloadSuccess<ILike>(res)
      }
    )
    if (transactionresult.type == 'successPayload') {
      const { rows } = transactionresult.result
      return pokemonListSuccess(rows)
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
        return transactionPayloadSuccess<ICount>(res)
      }
    )
    if (transactionResult.type == 'successPayload') {
      const { rows } = transactionResult.result
      return likeCountSuccess(rows[0].count)
    }
    if (transactionResult.type == 'error') return transactionResult
    return createErrorMessage("success sans payload n'existe pas")
  }

const addPokemonLike =
  (baseRepository: BaseRepositoryType): AddPokemonLikeType =>
  async (user_uuid: string, pokemonId: number) => {
    const res = await baseRepository.transaction(async (client) => {
      return await addLikeEntry(client, pokemonId, user_uuid)
    })
    if (res.type == 'successPayload')
      return createErrorMessage("success sans payload n'existe pas")
    return res
  }

const removePokemonLike =
  (baseRepository: BaseRepositoryType): AddPokemonLikeType =>
  async (user_uuid: string, pokemonId: number) => {
    const res = await baseRepository.transaction(async (client) => {
      return await deleteLikeEntry(client, pokemonId, user_uuid)
    })
    if (res.type == 'successPayload')
      return createErrorMessage("success sans payload n'existe pas")
    return res
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

const likeCountSuccess = (count: number): Likes => {
  return { type: 'success', like: count }
}

const pokemonListSuccess = (
  pokemonlists: ILike[]
): PokemonIdListResultSuccess => {
  return { type: 'success', pokemons: pokemonlists }
}
