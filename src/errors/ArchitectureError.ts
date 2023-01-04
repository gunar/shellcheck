import process from 'node:process';

/**
 * Architecture error.
 */
export class ArchitectureError extends Error {
  /**
   * Construct a new Error.
   *
   * @param message - Error message.
   */
  constructor(message = `Architecture '${process.arch}' is not supported`) {
    super(message);

    Object.setPrototypeOf(this, ArchitectureError.prototype);
  }
}
