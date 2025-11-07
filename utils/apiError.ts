/**
 * This is the class that helps to make the handling the error
 */

class ApiError extends Error {
  status: number | undefined;

  constructor(status: number, message: string) {
    super(message);
    this.status = status

    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;