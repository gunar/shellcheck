import process from 'node:process';
import { config } from '~/configs/index.js';
import { PlatformError } from '~/errors/index.js';

/**
 * ShellCheck Archive arguments.
 */
export type ShellCheckArchiveArgs = {
  /**
   * Platform.
   */
  platform?: NodeJS.Platform;
};

/**
 * Convert platform to ShellCheck archive.
 *
 * @param args - Arguments.
 * @returns ShellCheck archive.
 */
export function shellCheckArchive(args?: ShellCheckArchiveArgs) {
  const opts: Required<ShellCheckArchiveArgs> = {
    platform: args?.platform ?? process.platform,
  };

  const archive = config.binaries[opts.platform]?.archive;

  if (archive === undefined) throw new PlatformError(opts.platform);
  return archive;
}
