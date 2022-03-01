import { addUser } from "./addUser";
import { findUser } from "./findUser";
import { QueryServiceDeps } from "./QueryServiceDeps";
import { QueryServiceType } from "./QueryServiceType";

export const queryService = (deps: QueryServiceDeps): QueryServiceType => {
  return {
    addUser: addUser(deps.client),
    findUser: findUser(deps.client),
  };
};
