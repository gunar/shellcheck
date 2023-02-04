import process from 'node:process';

/**
 * Platform error.
 */
export class PlatformError extends Error {
  /**
   * Construct a new Error.
   *
   * @param platform - Platform.
   */
  constructor(platform: NodeJS.Platform = process.platform) {
    super(`Platform '${platform}' is not supported`);

    Object.setPrototypeOf(this, PlatformError.prototype);
  }
}
