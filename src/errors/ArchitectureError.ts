import process from 'node:process';

/**
 * Architecture error.
 */
export class ArchitectureError extends Error {
  /**
   * Construct a new Error.
   *
   * @param architecture - Architecture.
   * @param platform - Platform.
   */
  constructor(
    architecture: NodeJS.Architecture = process.arch,
    platform: NodeJS.Platform = process.platform,
  ) {
    super(
      `Architecture '${architecture}' of platform '${platform}' is not supported`,
    );

    Object.setPrototypeOf(this, ArchitectureError.prototype);
  }
}
