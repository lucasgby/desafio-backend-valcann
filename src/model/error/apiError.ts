class ApiError extends Error {
  public readonly status: number;

  constructor(message: string, status: number) {
    super(message)
    this.status = status;
  }
}

class BadRequestError extends ApiError {
  constructor(message: string) {
    super(message, 400)
  }
}

class NotFoundError extends ApiError {
  constructor(message: string) {
    super(message, 404)
  }
}

export {
  ApiError,
  BadRequestError,
  NotFoundError,
}