import { Pool, PoolClient, QueryResult } from 'pg'
import { APIError, createCatchErrorMessage } from '..'
export type BaseRepositoryType = {
  transaction: <Result>(
    f: (client: PoolClient) => Promise<QueryResult<Result>>
  ) => TransactionResult<Result>
}
// fonction utilitaire pour les transactions et repository
export const BaseRepository = (pool: Pool): BaseRepositoryType => {
  return {
    transaction: transaction(pool),
  }
}
export type TransactionResult<Result> = Promise<
  APIError | TransactionSuccess<Result>
>
export type TransactionSuccess<Result> = {
  type: 'success'
  result: QueryResult<Result>
}
// T is the Promise coming from the client
const transaction =
  (pool: Pool) =>
  async <Result>(
    f: (client: PoolClient) => Promise<QueryResult<Result>>
  ): TransactionResult<Result> => {
    const client = await pool.connect()
    try {
      await client.query('BEGIN')
      const result = await f(client)
      await client.query('COMMIT')
      return {
        type: 'success',
        result: result,
      }
    } catch (e) {
      await client.query('ROLLBACK')
      return createCatchErrorMessage(e)
    } finally {
      client.release()
    }
  }
