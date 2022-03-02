export type ErrorS = {
  type: "error";
  message: string;
};

export const createErrorMessage = (message: string): ErrorS => {
  return {
    type: "error",
    message: message,
  };
};
export const createCatchErrorMessage = (message: unknown): ErrorS => {
  const err = message as Error;
  return {
    type: "error",
    message: err.message,
  };
};
