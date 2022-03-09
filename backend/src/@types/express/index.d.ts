import { PayLoadToken } from '../../services'

declare global {
  namespace Express {
    interface Request {
      token: PayLoadToken
    }
  }
}
export {}
