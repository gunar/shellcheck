import fs from 'node:fs/promises';
import process from 'node:process';
import child_process from 'node:child_process';
import { config } from '~/configs/index.js';
import { logger } from '~/logger/index.js';
import { download } from '~/helpers/index.js';

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
  /**
   * Token.
   */
  token?: string;
};

/**
 * Spawn ShellCheck.
 * Download ShellCheck if not found or invalid.
 *
 * @param args - ShellCheck arguments.
 * @returns ShellCheck output.
 */
export async function shellcheck(
  args?: ShellCheckArgs,
): Promise<child_process.SpawnSyncReturns<Buffer>> {
  const opts: Required<Omit<ShellCheckArgs, 'token'>> & { token?: string } = {
    bin: args?.bin ?? config.bin,
    args: args?.args ?? process.argv.slice(2),
    stdio: args?.stdio ?? 'pipe',
    token: args?.token ?? process.env.GITHUB_TOKEN,
  };
  logger.debug(`ShellCheck: ${JSON.stringify(opts)}`);

  try {
    // Check binary
    logger.debug(`ShellCheck checking binary '${opts.bin}'`);
    await fs.access(
      opts.bin,
      // eslint-disable-next-line no-bitwise
      fs.constants.F_OK | fs.constants.W_OK | fs.constants.X_OK,
    );
  } catch {
    // Download ShellCheck
    try {
      logger.info(
        `ShellCheck binary not found or invalid, downloading to '${opts.bin}'`,
      );
      await download({ destination: opts.bin, token: opts.token });
      logger.info(`ShellCheck binary successfully downloaded to '${opts.bin}'`);
    } catch (err) {
      logger.error(
        `Error downloading ShellCheck binary to '${opts.bin}': ${err}`,
      );
      throw err;
    }
  }

  // Spawn ShellCheck
  logger.debug(
    `ShellCheck spawning binary '${opts.bin}' with arguments '${opts.args}'`,
  );
  return child_process.spawnSync(opts.bin, opts.args, { stdio: opts.stdio });
}
