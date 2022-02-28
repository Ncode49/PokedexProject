import { Client } from "pg";
import { QueryBdd } from "../../postgre/query";

export const queryService = async (client: Client, query: QueryBdd) => {
  try {
    // if client connect fail to the catch?
    await client.connect();
    await client.query(query);
    await client.end();
  } catch (error) {
    client.end();
    const err = error as Error;
  }
};
