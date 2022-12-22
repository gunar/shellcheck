/**
 * Internal error.
 */
export class InternalError extends Error {
  /**
   * Construct a new Error.
   *
   * @param message - Error message.
   */
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, InternalError.prototype);
  }
}
