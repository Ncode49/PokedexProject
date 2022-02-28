import { Client } from "pg";

export interface QueryServiceDeps {
  client: Client;
}
