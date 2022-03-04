import { Pool, QueryResult } from "pg";
import { APIError, createCatchErrorMessage } from "..";

export type TransactionType<QueryReturn> = Promise<
  QueryType<QueryReturn> | APIError
>;
export type QueryType<QueryReturn> = {
  type: "success";
  queryReturn: QueryResult<QueryReturn>;
};
export type PgQuery = {
  text: string;
  values: string[];
};

export type MessageS = {
  type: "success";
  message: string;
};

export const oneTransaction = async <QueryReturn>(
  pool: Pool,
  query: PgQuery
): TransactionType<QueryReturn> => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const queryReturn: QueryResult<QueryReturn> =
      await client.query<QueryReturn>(query);
    await client.query("COMMIT");
    return {
      type: "success",
      queryReturn: queryReturn,
    };
  } catch (error) {
    await client.query("ROLLBACK");
    return createCatchErrorMessage(error);
  } finally {
    client.release();
  }
};
