import express from 'express'
import { LikeControllerType } from './LikeController'

export const likeRouter = (
  likeController: LikeControllerType,
  extractJWT: any
) => {
  const likeRouter = express.Router()
  likeRouter.post('/addLike', extractJWT, likeController.addLike)
  likeRouter.post('/getPokemonlike', extractJWT, likeController.getPokemonlike)
  likeRouter.post('/getUserPokemon', extractJWT, likeController.getPokemonsUser)
  return likeRouter
}
