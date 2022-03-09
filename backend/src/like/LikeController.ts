import { Request, Response } from 'express'
import { LikeServiceType } from '.'
import { CustomRequest } from '../expressType'
import { createCatchErrorMessage } from '../services'
export type LikeAddLikeControllerType = (
  req: CustomRequest<PokemonId>,
  res: Response
) => Promise<Response<any, Record<any, string>>>
export type GetLikeControllerType = (
  req: Request,
  res: Response
) => Promise<Response<any, Record<any, string>>>
export type GetPokemonsUserControllerType = (
  req: Request,
  res: Response
) => Promise<Response<any, Record<any, string>>>
export type RemoveLikeControllerType = (
  req: CustomRequest<PokemonId>,
  res: Response
) => Promise<Response<any, Record<any, string>>>
export type LikeControllerType = {
  addLike: LikeAddLikeControllerType
  getPokemonlike: GetLikeControllerType
  getPokemonsUser: GetPokemonsUserControllerType
}
type PokemonId = {
  pokemonId: number
}
export const LikeController = (
  likeService: LikeServiceType
): LikeControllerType => {
  return {
    addLike: addLike(likeService),
    getPokemonlike: getPokemonlike(likeService),
    getPokemonsUser: getPokemonsUser(likeService),
  }
}

const addLike =
  (likeService: LikeServiceType): LikeAddLikeControllerType =>
  async (req: CustomRequest<PokemonId>, res: Response) => {
    try {
      const { user_uuid } = req.token
      const { pokemonId } = req.body
      console.log(user_uuid, pokemonId)
      const message = await likeService.addLike(user_uuid, pokemonId)
      if (message.type == 'success') return res.status(200).json(message)
      return res.status(500).json(message)
    } catch (error) {
      return res.status(500).json(createCatchErrorMessage(error))
    }
  }

const getPokemonlike =
  (likeService: LikeServiceType): GetLikeControllerType =>
  async (req: CustomRequest<PokemonId>, res: Response) => {
    try {
      const { pokemonId } = req.body
      const message = await likeService.getLike(pokemonId)
      if (message.type == 'success') return res.status(200).json(message)
      return res.status(500).json(message)
    } catch (error) {
      return res.status(500).json(createCatchErrorMessage(error))
    }
  }

const getPokemonsUser =
  (likeService: LikeServiceType): GetPokemonsUserControllerType =>
  async (req: Request, res: Response) => {
    try {
      const { user_uuid } = req.token
      const message = await likeService.getUserLikedPokemons(user_uuid)
      if (message.type == 'success') return res.status(200).json(message)
      return res.status(500).json(message)
    } catch (error) {
      return res.status(500).json(createCatchErrorMessage(error))
    }
  }
