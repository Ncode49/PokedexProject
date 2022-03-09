import { Pool, PoolClient, QueryResult } from 'pg'
import { APIError, createCatchErrorMessage } from '..'
import { TransactionSuccess } from './BaseRepository'
export type TransactionType<QueryReturn> = Promise<
  QueryType<QueryReturn> | APIError
>
export type QueryType<QueryReturn> = {
  type: 'success'
  queryReturn: QueryResult<QueryReturn>
}
export type PgQuery = {
  text: string
  values: (string | number)[]
}

export type MessageS = {
  type: 'success'
  message: string
}

export const transactionPayloadSuccess = <T>(
  result: QueryResult<T>
): TransactionSuccess<T> => {
  return {
    type: 'successPayload',
    result: result,
  }
}
export const messageSuccess = (message: string): MessageS => {
  return {
    type: 'success',
    message: message,
  }
}
