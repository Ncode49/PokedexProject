export type Message = {
  message: string;
};
export const createErrorMessage = (message: string) => {
  return {
    message: message,
  };
};
export const createCatchErrorMessage = (message: unknown) => {
  const err = message as Error;
  return {
    message: err.message,
  };
};
