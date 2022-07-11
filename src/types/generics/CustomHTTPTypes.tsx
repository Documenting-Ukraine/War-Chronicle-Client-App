type ErrorResponseData = {
  error: true;
  message: string;
  metadata: Error;
};
export const isErrorResponseData = (e: any): e is ErrorResponseData => {
  try {
    return e.error && e.message && e.metadata;
  } catch (a) {
    return false;
  }
};
type SuccessResponseData = { error: false; result: Object };

export type { ErrorResponseData, SuccessResponseData };
