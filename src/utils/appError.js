export class AppError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode;
    statusCode = `${statusCode}`.startsWith(1) ? 'Fail' : 'Error';
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructore);
  }
}