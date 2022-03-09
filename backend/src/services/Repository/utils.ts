import { Pool, PoolClient, QueryResult } from 'pg'
import { APIError, createCatchErrorMessage } from '..'
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

export const transaction = async <Data>(
  pool: Pool,
  f: (client: PoolClient) => Promise<QueryResult<Data>>
): TransactionType<Data> => {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const result = await f(client)
    await client.query('COMMIT')

    return {
      type: 'success',
      queryReturn: result,
    }
  } catch (error) {
    await client.query('ROLLBACK')
    return createCatchErrorMessage(error)
  } finally {
    client.release()
  }
}

export const oneTransaction = async <QueryReturn>(
  pool: Pool,
  query: PgQuery
): TransactionType<QueryReturn> => {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const queryReturn: QueryResult<QueryReturn> =
      await client.query<QueryReturn>(query)
    await client.query('COMMIT')

    return {
      type: 'success',
      queryReturn: queryReturn,
    }
  } catch (error) {
    await client.query('ROLLBACK')
    return createCatchErrorMessage(error)
  } finally {
    client.release()
  }
}
