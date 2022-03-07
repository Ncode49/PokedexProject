import { Pool } from 'pg'
import { createErrorMessage, createSuccessMessage } from '..'
import { APIError } from '../Error'
import {
  BaseRepositoryType,
  TransactionResult,
  TransactionSuccess,
} from './BaseRepository'
import { MessageS } from './utils'
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
      async (client) => {
        const res = await client.query<IUser>({
          text: 'INSERT INTO users("username","password") VALUES($1, $2) RETURNING *',
          values: [username, hash],
        })
        const success: MessageS = {
          type: 'success',
          message: "l'utilisateur a été ajoute en base de donnée",
        }
        return success
      }
    )
    if (
      transactionResult.type == 'error' ||
      transactionResult.type == 'success'
    )
      return transactionResult
    return createErrorMessage("success avec payload n'existe pas")
  }

const getPasswordByUsername =
  (baseRepository: BaseRepositoryType) =>
  async (username: string): GetPasswordByUsernameResultType => {
    const transactionResult = await baseRepository.transaction<IUser>(
      async (client) => {
        const result = await client.query<IUser>({
          text: 'SELECT * FROM users WHERE username = $1',
          values: [username],
        })
        const successPayload: TransactionSuccess<IUser> = {
          type: 'successPayload',
          result: result,
        }
        return successPayload
      }
    )
    if (transactionResult.type == 'error') return transactionResult
    if (transactionResult.type == 'successPayload') {
      const { rows } = transactionResult.result
      if (rows.length == 0)
        return createErrorMessage(
          "l'utilisateur n'existe pas en base de données"
        )
      return {
        type: 'success',
        password: rows[0].password,
      }
    }
    return createErrorMessage("success sans payload n'existe pas")
  }

// abstraction des transactions
// cree une fonction qui fait le traitement
// function(c client => client.query)
