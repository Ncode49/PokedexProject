import { Pool } from 'pg'
import { APIError } from '../Error'
import { BaseRepositoryType } from './BaseRepository'
import { MessageS, oneTransaction } from './utils'
export interface IUser {
  username: string
  password: string
}

type PasswordS = {
  type: 'success'
  password: string
}
export type GetPasswordByUsernameResultType = Promise<APIError | PasswordS>
export type AddUserResultType = Promise<MessageS | APIError>

export type UserRepositoryType = {
  addUser: (username: string, password: string) => AddUserResultType
  getPasswordByUsername: (
    username: string,
    password: string
  ) => GetPasswordByUsernameResultType
}

export const UserRepository = (
  baseRepository: BaseRepositoryType
): UserRepositoryType => {
  return {
    addUser: addUser(baseRepository),
    getPasswordByUsername: getPasswordByUsername(baseRepository),
  }
}

// transaction((client) => client.query({text: ...., values: [...]}))

const addUser =
  (baseRepository: BaseRepositoryType) =>
  async (username: string, hash: string): AddUserResultType => {
    const transactionResult = await baseRepository.transaction<IUser>(
      (client) => {
        return client.query({
          text: 'INSERT INTO users("username","password") VALUES($1, $2) RETURNING *',
          values: [username, hash],
        })
      }
    )
    if (transactionResult.type == 'error') return transactionResult
    return {
      type: 'success',
      message: "l'utilisateur a été ajoute en base de donnée",
    }
  }

const getPasswordByUsername =
  (baseRepository: BaseRepositoryType) =>
  async (username: string): GetPasswordByUsernameResultType => {
    const transactionResult = await baseRepository.transaction<IUser>(
      (client) => {
        return client.query<IUser>({
          text: 'SELECT * FROM users WHERE username = $1',
          values: [username],
        })
      }
    )
    if (transactionResult.type == 'error') return transactionResult
    const { rows } = transactionResult.result
    if (rows.length == 0)
      return {
        type: 'error',
        message: "l'utilisateur n'existe pas en base de données",
      }
    return { type: 'success', password: rows[0].password }
  }
// abstraction des transactions
// cree une fonction qui fait le traitement
// function(c client => client.query)
