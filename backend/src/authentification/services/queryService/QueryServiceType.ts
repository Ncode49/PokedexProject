import { QueryBdd } from "../../../postgre/query";
import { Message } from "../registerService/registerService";

export type QueryServiceType = {
  addUser: (query: QueryBdd) => Promise<Message>;
};
