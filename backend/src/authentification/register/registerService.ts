// prend en paramaetre les méthode qui renvoit un service

import { CryptoServiceType } from "../../services/CryptoService/CryptoService";
import { createCatchErrorMessage, ErrorS } from "../../services/Error";
import { MessageS, UserRType } from "../../services/UserR/UserR";
// ce qui est dans les ervice peut etre appelée dans la methode renvoyé
// client est la dépendance
export type RegisterServiceType = {
  register: (username: string, password: string) => Promise<MessageS | ErrorS>;
};

export const RegisterService = (
  userR: UserRType,
  cryptoService: CryptoServiceType
): RegisterServiceType => {
  return {
    register: register(userR, cryptoService),
  };
};

export const register =
  (userR: UserRType, cryptoService: CryptoServiceType) =>
  async (username: string, password: string) => {
    try {
      const hashOrError = await cryptoService.hashPassword(password);
      if (hashOrError.type == "error") return hashOrError;
      return await userR.addUser(username, hashOrError.hash);
    } catch (error) {
      return createCatchErrorMessage(error);
    }
  };
