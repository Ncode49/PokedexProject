import { Pool, PoolClient, QueryResult } from 'pg'
import { APIError, createCatchErrorMessage } from '..'
import { MessageS } from './utils'
export type TransactionResult<Result> = Promise<
  APIError | TransactionSuccess<Result> | MessageS
>
export type TransactionSuccess<Result> = {
  type: 'successPayload'
  result: QueryResult<Result>
}
export type BaseRepositoryType = {
  transaction: <Result>(
    f: (client: PoolClient) => TransactionResult<Result>
  ) => TransactionResult<Result>
}
// fonction utilitaire pour les transactions et repository
export const BaseRepository = (pool: Pool): BaseRepositoryType => {
  return {
    transaction: transaction(pool),
  }
}

// T is the Promise coming from the client
const transaction =
  (pool: Pool) =>
  async <Result>(
    f: (client: PoolClient) => TransactionResult<Result>
  ): TransactionResult<Result> => {
    const client = await pool.connect()
    try {
      await client.query('BEGIN')
      const result = await f(client)
      await client.query('COMMIT')
      return result
    } catch (e) {
      await client.query('ROLLBACK')
      return createCatchErrorMessage(e)
    } finally {
      client.release()
    }
  }
