import { addUser } from "./addUser";
import { QueryServiceDeps } from "./QueryServiceDeps";
import { QueryServiceType } from "./QueryServiceType";

export const queryService = (deps: QueryServiceDeps): QueryServiceType => {
  return { addUser: addUser(deps.client) };
};
