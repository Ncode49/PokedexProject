import { Pool, PoolClient } from 'pg'
import { APIError, createCatchErrorMessage } from '..'

// fonction utilitaire pour les transactions et repository
export const BaseRepository = () => {
  return transaction
}
export type TransactionResult<Result> = Promise<
  APIError | TransactionSucess<Result>
>
export type TransactionSucess<Result> = {
  type: 'success'
  result: Result
}
// T is the Promise coming from the client
const transaction =
  (pool: Pool) =>
  async <T>(f: (client: PoolClient) => T): TransactionResult<T> => {
    const client = await pool.connect()
    try {
      await client.query('BEGIN')
      const result = await f(client)
      await client.query('COMMIT')
      return {
        type: 'success',
        result: result,
      }
      result
    } catch (e) {
      await client.query('ROLLBACK')
      return createCatchErrorMessage(e)
    } finally {
      client.release()
    }
  }
