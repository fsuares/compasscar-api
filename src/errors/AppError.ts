export default class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number
  ) {
    super(message)
  }
}
