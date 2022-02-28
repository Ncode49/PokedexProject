import { Client } from "pg";
import { QueryServiceType } from "../queryService/QueryServiceType";

// ???
export interface RegisterServiceDeps {
  queryService: QueryServiceType;
}
