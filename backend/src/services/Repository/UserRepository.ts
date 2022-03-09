import { createErrorMessage, createSuccessMessage } from '..'
import { APIError } from '../Error'
import { BaseRepositoryType, TransactionSuccess } from './BaseRepository'
import { MessageS, messageSuccess, transactionPayloadSuccess } from './utils'
export interface IUser {
  user_uuid: string
  username: string
  password_hash: string
}

type PasswordHashS = {
  type: 'success'
  password_hash: string
}
export type GetPasswordHashByUsernameUserRepositoryType = (
  username: string
) => Promise<APIError | PasswordHashS>
export type AddUserUserRepositoryServiceType = (
  username: string,
  password: string
) => Promise<MessageS | APIError>
export type GetUuidByUsernameUserRepositoryType = (
  username: string
) => Promise<APIError | UserUuidS>
export type UserRepositoryType = {
  addUser: AddUserUserRepositoryServiceType
  getPasswordHashByUsername: GetPasswordHashByUsernameUserRepositoryType
  getUuidByUsername: GetUuidByUsernameUserRepositoryType
}

export const UserRepository = (
  baseRepository: BaseRepositoryType
): UserRepositoryType => {
  return {
    addUser: addUser(baseRepository),
    getPasswordHashByUsername: getPasswordHashByUsername(baseRepository),
    getUuidByUsername: getUuidByUsername(baseRepository),
  }
}

const addUser =
  (baseRepository: BaseRepositoryType): AddUserUserRepositoryServiceType =>
  async (username: string, hash: string) => {
    const transactionResult = await baseRepository.transaction<IUser>(
      async (client) => {
        const res = await client.query<IUser>({
          text: 'INSERT INTO "user"("user_uuid","username","password_hash") VALUES(uuid_generate_v4(),$1, $2) RETURNING *',
          values: [username, hash],
        })
        return messageSuccess("l'utilisateur a été ajouté en base de donnée")
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
  (
    baseRepository: BaseRepositoryType
  ): GetPasswordHashByUsernameUserRepositoryType =>
  async (username: string) => {
    const transactionResult = await baseRepository.transaction<IUser>(
      async (client) => {
        const result = await client.query<IUser>({
          text: 'SELECT * FROM "user" WHERE username = $1',
          values: [username],
        })
        return transactionPayloadSuccess<IUser>(result)
      }
    )
    if (transactionResult.type == 'error') return transactionResult
    if (transactionResult.type == 'success')
      return createErrorMessage("success sans payload n'existe pas")

    const { rows } = transactionResult.result
    if (rows.length == 0)
      return createErrorMessage("l'utilisateur n'existe pas en base de données")
    return passworHashSuccess(rows[0].password_hash)
  }

const getUuidByUsername =
  (baseRepository: BaseRepositoryType): GetUuidByUsernameUserRepositoryType =>
  async (username: string) => {
    const transactionResult = await baseRepository.transaction<IUser>(
      async (client) => {
        const result = await client.query<IUser>({
          text: 'SELECT * FROM "user" WHERE username = $1',
          values: [username],
        })
        return transactionPayloadSuccess<IUser>(result)
      }
    )
    if (transactionResult.type == 'error') return transactionResult
    if (transactionResult.type == 'success')
      return createErrorMessage("success sans payload n'existe pas")

    const { rows } = transactionResult.result
    if (rows.length == 0)
      return createErrorMessage("l'utilisateur n'existe pas en base de données")
    return useruuidSuccess(rows[0].user_uuid)
  }

const passworHashSuccess = (passwordHash: string): PasswordHashS => {
  return {
    type: 'success',
    password_hash: passwordHash,
  }
}

const useruuidSuccess = (user_uuid: string): UserUuidS => {
  return {
    type: 'success',
    user_uuid: user_uuid,
  }
}
export type UserUuidS = {
  type: 'success'
  user_uuid: string
}
