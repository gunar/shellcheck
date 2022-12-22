import process from 'node:process';

/**
 * Bin name arguments.
 */
export type BinNameArgs = {
  /**
   * Binary name.
   */
  name?: string;
  /**
   * OS platform.
   */
  platform?: NodeJS.Platform;
};

/**
 * Binary name in OS platform.
 *
 * @param args - Arguments.
 * @returns Binary name.
 */
export function binName(args?: BinNameArgs): string {
  const name = args?.name ?? 'shellcheck';
  const platform = args?.platform ?? process.platform;
  const extension = platform === 'win32' ? '.exe' : '';

  return `${name}${extension}`;
}
