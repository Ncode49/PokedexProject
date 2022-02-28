import bcryptjs from "bcryptjs";
export type Hash = string;
export const hashPassword = async (password: string): Promise<Hash> => {
  const hash = await bcryptjs.hash(password, 10);
  return hash;
};
