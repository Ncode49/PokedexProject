import { APIError, createCatchErrorMessage, MessageS } from '../services'
import {
  Likes,
  LikeRepositoryType,
} from '../services/Repository/LikeRepository'
export type ActionType = 'like' | 'unlike'

export type GetLikeServiceType = (id: number) => Promise<APIError | Likes>
export type AddLikeServiceType = (
  action: string,
  pokemonId: number,
  username: string
) => Promise<APIError | MessageS>
export type GetUserLikedPokemonsServiceType = (username: string) => any
export type LikeServiceType = {
  getLike: GetLikeServiceType
  addLike: AddLikeServiceType
  getUserLikedPokemons: (username: string) => Promise<APIError>
}
export const LikeService = (likeRepository: LikeRepositoryType) => {
  return {
    getLike: getLike(likeRepository),
    addLike: addLike(likeRepository),
    getUserLikedPokemons: getUserLikedPokemons(likeRepository),
  }
}
const getUserLikedPokemons =
  (likeRepository: LikeRepositoryType): GetUserLikedPokemonsServiceType =>
  async (username: string) => {
    try {
      return await likeRepository.getUserLikedPokemons(username)
    } catch (error) {
      return createCatchErrorMessage(error)
    }
  }

// pokemon: string, like: number
const addLike =
  (likeRepository: LikeRepositoryType): AddLikeServiceType =>
  async (action: string, pokemonId: number, username: string) => {
    try {
      const likeNumber = action == 'like' ? 1 : -1
      return await likeRepository.addPokemonLike(
        pokemonId,
        likeNumber,
        username
      )
    } catch (error) {
      return createCatchErrorMessage(error)
    }
  }
const getLike =
  (likeRepository: LikeRepositoryType): GetLikeServiceType =>
  async (pokemonId: number) => {
    try {
      return await likeRepository.getPokemonLikes(pokemonId)
    } catch (error) {
      return createCatchErrorMessage(error)
    }
  }
