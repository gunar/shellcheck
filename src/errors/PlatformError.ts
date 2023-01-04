import process from 'node:process';

/**
 * Platform error.
 */
export class PlatformError extends Error {
  /**
   * Construct a new Error.
   *
   * @param message - Error message.
   */
  constructor(message = `Platform '${process.platform}' is not supported`) {
    super(message);

    Object.setPrototypeOf(this, PlatformError.prototype);
  }
}
