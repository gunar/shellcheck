import process from 'node:process';
import { config } from '~/configs/index.js';
import { PlatformError } from '~/errors/index.js';

/**
 * ShellCheck Platform arguments.
 */
export type ShellCheckPlatformArgs = {
  /**
   * Platform.
   */
  platform?: NodeJS.Platform;
};

/**
 * Convert platform to ShellCheck platform.
 *
 * @param args - Arguments.
 * @returns ShellCheck platform.
 */
export function shellCheckPlatform(args?: ShellCheckPlatformArgs) {
  const opts: Required<ShellCheckPlatformArgs> = {
    platform: args?.platform ?? process.platform
  };

  const platform = config.binaries[opts.platform]?.platform;

  if (platform === undefined) throw new PlatformError(opts.platform);
  return platform;
}
