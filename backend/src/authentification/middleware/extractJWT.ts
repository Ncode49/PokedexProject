// take token,
import { Request, Response, NextFunction } from 'express'
import { JWTServiceType } from '../../services'
// 401 unauthorized
// How to eliminate the any ???
export const ExtractJWT =
  (jwtService: JWTServiceType) =>
  (req: Request, res: Response, next: NextFunction): any => {
    try {
      const authHeader = req.headers['authorization']
      const token = authHeader && authHeader.split(' ')[1]
      if (token == null)
        return res
          .status(401)
          .json({ type: 'middleware error', message: 'token in empty' })
      const jwtResult = jwtService.verifyAccessToken(token)
      if (jwtResult.type == 'error') return res.status(401).json(jwtResult)
      // pass the data to the next middleware
      req.token = jwtResult.payload
      console.log(req.token)

      next()
    } catch (error) {
      const err = error as Error
      return res.status(403).json(err.message)
    }
  }
