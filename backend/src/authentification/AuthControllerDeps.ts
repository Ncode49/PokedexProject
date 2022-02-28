import { Client } from "pg";

// ensemble des services dont dépend le controller
export interface AutnControllerDeps {
  client: Client;
}
