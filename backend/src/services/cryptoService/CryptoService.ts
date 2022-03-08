import bcryptjs from 'bcryptjs'
import { createCatchErrorMessage, APIError } from '../Error'
type HashS = {
  type: 'success'
  hash: string
}
type BoolS = {
  type: 'success'
  bool: boolean
}

export type CompareHashServiceType = (
  password: string,
  hash: string
) => Promise<BoolS | APIError>
export type HashPasswordServiceType = (
  password: string
) => Promise<HashS | APIError>
export type CryptoServiceType = {
  compareHash: CompareHashServiceType
  hashPassword: HashPasswordServiceType
}

export const CryptService = (): CryptoServiceType => {
  return {
    hashPassword: hashPassword,
    compareHash: compareHash,
  }
}

const compareHash: CompareHashServiceType = async (
  password: string,
  hash: string
) => {
  try {
    const bool = await bcryptjs.compare(password, hash)
    return {
      type: 'success',
      bool: bool,
    }
  } catch (error) {
    return createCatchErrorMessage(error)
  }
}

const hashPassword: HashPasswordServiceType = async (password: string) => {
  try {
    const hash = await bcryptjs.hash(password, 10)
    return {
      type: 'success',
      hash: hash,
    }
  } catch (error) {
    return createCatchErrorMessage(error)
  }
}
