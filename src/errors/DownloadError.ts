/**
 * Download error.
 */
export class DownloadError extends Error {
  /**
   * Construct a new Error.
   *
   * @param message - Error message.
   */
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, DownloadError.prototype);
  }
}
