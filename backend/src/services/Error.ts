export type APIError = {
  type: "error";
  message: string;
};

export const createErrorMessage = (message: string): APIError => {
  return {
    type: "error",
    message: message,
  };
};
export const createCatchErrorMessage = (message: unknown): APIError => {
  const err = message as Error;
  return {
    type: "error",
    message: err.message,
  };
};
