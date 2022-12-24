/**
 * Request error.
 */
export class RequestError extends Error {
  /**
   * Construct a new Error.
   *
   * @param message - Error message.
   */
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, RequestError.prototype);
  }
}
