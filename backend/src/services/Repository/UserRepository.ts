import { Pool, QueryResult } from "pg";
import { createCatchErrorMessage, APIError } from "../Error";
export interface IUser {
  username: string;
  password: string;
}
export type Query = {
  text: string;
  values: string[];
};

export type MessageS = {
  type: "success";
  message: string;
};

type PasswordS = {
  type: "success";
  password: string;
};
export type GetPasswordByUsernameResultType = Promise<APIError | PasswordS>;
export type AddUserResultType = Promise<MessageS | APIError>;

type TransactionType<QueryReturn> = Promise<QueryType<QueryReturn> | APIError>;
type QueryType<QueryReturn> = {
  type: "success";
  queryReturn: QueryResult<QueryReturn>;
};
export type UserRepositoryType = {
  addUser: (username: string, password: string) => AddUserResultType;
  getPasswordByUsername: (
    username: string,
    password: string
  ) => GetPasswordByUsernameResultType;
};

export const UserRepository = (pool: Pool): UserRepositoryType => {
  return {
    addUser: addUser(pool),
    getPasswordByUsername: getPasswordByUsername(pool),
  };
};

// transaction((client) => client.query({text: ...., values: [...]}))
const oneTransaction = async <QueryReturn>(
  pool: Pool,
  query: Query
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
const addUser =
  (pool: Pool) =>
  async (username: string, hash: string): AddUserResultType => {
    const transactionResult = await oneTransaction(pool, {
      text: "INSERT INTO users(username, password) VALUES($1, $2) RETURNING *",
      values: [username, hash],
    });
    if (transactionResult.type == "error") return transactionResult;
    return {
      type: "success",
      message: "l'utilisateur a été enregistré en bdd",
    };
  };

const getPasswordByUsername =
  (pool: Pool) =>
  async (username: string): GetPasswordByUsernameResultType => {
    const transactionResult = await oneTransaction<IUser>(pool, {
      text: "SELECT *  FROM users WHERE username = $1",
      values: [username],
    });
    if (transactionResult.type == "error") return transactionResult;
    const { rows } = transactionResult.queryReturn;
    if (rows.length == 0)
      return {
        type: "error",
        message: "l'utilisateur n'existe pas en base de données",
      };
    return { type: "success", password: rows[0].password };
  };
// abstraction des transactions
