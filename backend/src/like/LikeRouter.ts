import express from 'express'
import { LikeControllerType } from './LikeController'

export const likeRouter = (
  likeController: LikeControllerType,
  extractJWT: any
) => {
  const likeRouter = express.Router()
  likeRouter.post('/addLike', extractJWT, likeController.addLike)
  likeRouter.delete('/removeLike', extractJWT, likeController.removeLike)
  likeRouter.get('/getPokemonlike', extractJWT, likeController.getPokemonlike)
  likeRouter.get('/getUserPokemon', extractJWT, likeController.getPokemonsUser)
  return likeRouter
}
