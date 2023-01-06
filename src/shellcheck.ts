import { constants as fsConstants } from 'fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import child_process from 'node:child_process';
import { config } from '~/configs';
import { logger } from '~/logger';
import { download } from '~/helpers';

/**
 * ShellCheck arguments.
 */
export type ShellCheckArgs = {
  /**
   * Binary path.
   */
  bin?: string;
  /**
   * ShellCheck arguments.
   */
  args?: string[];
  /**
   * Stdio.
   */
  stdio?: child_process.StdioOptions;
};

/**
 * Spawn ShellCheck.
 * Download ShellCheck if not found.
 *
 * @param args - ShellCheck arguments.
 * @returns ShellCheck output.
 */
export async function shellcheck(
  args?: ShellCheckArgs
): Promise<child_process.SpawnSyncReturns<Buffer>> {
  const opts: Required<ShellCheckArgs> = {
    bin: args?.bin ?? path.normalize(`${__dirname}/../bin/${config.bin}`),
    args: args?.args ?? process.argv.slice(2),
    stdio: args?.stdio ?? 'pipe'
  };
  logger.debug(`ShellCheck: ${JSON.stringify(opts)}`);

  try {
    // Check binary
    logger.debug(`ShellCheck checking binary '${opts.bin}'`);
    await fs.access(
      opts.bin,
      // eslint-disable-next-line no-bitwise
      fsConstants.F_OK | fsConstants.W_OK | fsConstants.X_OK
    );
  } catch {
    // Download ShellCheck
    try {
      logger.info(
        `ShellCheck binary not found or invalid, downloading to '${opts.bin}'`
      );
      await download({ destination: opts.bin });
      logger.info(`ShellCheck binary successfully downloaded to '${opts.bin}'`);
    } catch (err) {
      logger.error(
        `Error downloading ShellCheck binary to '${opts.bin}': ${err}`
      );
      throw err;
    }
  }

  // Spawn ShellCheck
  logger.debug(
    `ShellCheck spawning binary '${opts.bin}' with arguments '${opts.args}'`
  );
  return child_process.spawnSync(opts.bin, opts.args, { stdio: opts.stdio });
}
