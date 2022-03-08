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
  password_hash: string
}

type PasswordHashS = {
  type: 'success'
  password_hash: string
}
export type GetPasswordHashByUsernameResultType = Promise<
  APIError | PasswordHashS
>
export type AddUserResultType = Promise<MessageS | APIError>

export type UserRepositoryType = {
  addUser: (username: string, password: string) => AddUserResultType
  getPasswordHashByUsername: (
    username: string,
    password: string
  ) => GetPasswordHashByUsernameResultType
}

export const UserRepository = (
  baseRepository: BaseRepositoryType
): UserRepositoryType => {
  return {
    addUser: addUser(baseRepository),
    getPasswordHashByUsername: getPasswordHashByUsername(baseRepository),
  }
}

const addUser =
  (baseRepository: BaseRepositoryType) =>
  async (username: string, hash: string): AddUserResultType => {
    const transactionResult = await baseRepository.transaction<IUser>(
      async (client) => {
        const res = await client.query<IUser>({
          text: 'INSERT INTO "user"("user_uuid","username","password_hash") VALUES(uuid_generate_v4(),$1, $2) RETURNING *',
          values: [username, hash],
        })
        const success: MessageS = {
          type: 'success',
          message: "l'utilisateur a été ajouté en base de donnée",
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

const getPasswordHashByUsername =
  (baseRepository: BaseRepositoryType) =>
  async (username: string): GetPasswordHashByUsernameResultType => {
    const transactionResult = await baseRepository.transaction<IUser>(
      async (client) => {
        const result = await client.query<IUser>({
          text: 'SELECT * FROM "user" WHERE username = $1',
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
        password_hash: rows[0].password_hash,
      }
    }
    return createErrorMessage("success sans payload n'existe pas")
  }

// abstraction des transactions
// cree une fonction qui fait le traitement
// function(c client => client.query)
