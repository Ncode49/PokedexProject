// prend en paramaetre les méthode qui renvoit un service

import {
  MessageS,
  APIError,
  UserRType,
  CryptoServiceType,
  createCatchErrorMessage,
} from "../../services";

// ce qui est dans les ervice peut etre appelée dans la methode renvoyé
// client est la dépendance

export type RegisterResultType = Promise<MessageS | APIError>;
export type RegisterServiceType = {
  register: (username: string, password: string) => RegisterResultType;
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
  async (username: string, password: string): RegisterResultType => {
    try {
      const hashResult = await cryptoService.hashPassword(password);
      if (hashResult.type == "error") return hashResult;
      return await userR.addUser(username, hashResult.hash);
    } catch (error) {
      return createCatchErrorMessage(error);
    }
  };
