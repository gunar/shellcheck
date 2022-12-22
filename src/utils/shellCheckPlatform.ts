import process from 'node:process';
import { config } from '~/configs';
import { PlatformError } from '~/errors';

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
  const platform =
    config.binaries[args?.platform ?? process.platform]?.platform;

  if (platform === undefined) throw new PlatformError();

  return platform;
}
