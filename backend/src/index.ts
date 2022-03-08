import express from 'express'
import { Pool } from 'pg'
import { AuthService, AuthControllerDI, ExtractJWT } from './authentification'
import config from './config/config'
import { authRouter } from './authentification/AuthRouter'
import { JWTService, CryptService, UserRepository } from './services'
import { likeRouter } from './like/likeRouter'
import { LikeController } from './like/LikeController'
import { LikeRepository } from './services/Repository/LikeRepository'
import { LikeService } from './like'
import { BaseRepository } from './services/Repository/BaseRepository'

const app = express()

// load middleware we need
// parse the data from input PUT or POST
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// middleware to connect localhost for http server
app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  )
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  )
  next()
})
// instanciation du client
const pool = new Pool(config.postgres)
// instantiation des services génériques
const jwtService = JWTService()
const cryptoService = CryptService()
const baseRepository = BaseRepository(pool)
const userRepository = UserRepository(baseRepository)
const pokemonRepository = LikeRepository(baseRepository)
// instanciation des middleware
const extractJWT = ExtractJWT(jwtService)
// instantiation du service spécifique
const authService = AuthService(userRepository, cryptoService, jwtService)
const likeService = LikeService(pokemonRepository)
// instanciation du controller globale
const authController = AuthControllerDI(authService)
const likeController = LikeController(likeService)
app.use('/auth', authRouter(authController, extractJWT))
app.use('/like', likeRouter(likeController, extractJWT))
app.listen(config.server.port, () => {
  console.log(`listening on ${config.server.port}`)
})
