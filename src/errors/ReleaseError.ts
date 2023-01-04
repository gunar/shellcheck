/**
 * Release error.
 */
export class ReleaseError extends Error {
  /**
   * Construct a new Error.
   *
   * @param message - Error message.
   */
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, ReleaseError.prototype);
  }
}
