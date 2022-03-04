import { Pool } from "pg";
import { APIError } from "../Error";
import { MessageS, oneTransaction } from "./utils";
export interface IUser {
  username: string;
  password: string;
}

type PasswordS = {
  type: "success";
  password: string;
};
export type GetPasswordByUsernameResultType = Promise<APIError | PasswordS>;
export type AddUserResultType = Promise<MessageS | APIError>;

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
      text: "SELECT * FROM users WHERE username = $1",
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
// cree une fonction qui fait le traitement
// function( client => client.query)
