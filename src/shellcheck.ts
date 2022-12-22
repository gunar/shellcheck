#!/usr/bin/env node

import 'global-agent/bootstrap';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import child_process from 'node:child_process';
import { logger } from '~/logger';
import { download } from '~/utils/download';
import { binName } from '~/utils';

/**
 * ShellCheck arguments.
 */
export type ShellCheckArgs = {
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
  const shellcheckArgs = args?.args ?? process.argv.slice(2);
  logger.debug(`ShellCheck arguments: '${shellcheckArgs}'`);
  const bin = path.normalize(`${__dirname}/../bin/${binName()}`);
  logger.debug(`ShellCheck binary: '${bin}'`);

  // Download ShellCheck if not found
  if (!fs.existsSync(bin)) {
    try {
      logger.info(`ShellCheck not found, downloading...`);
      await download({ destination: bin });
      logger.info(`Successfully downloaded ShellCheck to '${bin}'`);
    } catch (err) {
      logger.error(`Error downloading ShellCheck to '${bin}': ${err}`);
      throw err;
    }
  }

  // Spawn ShellCheck
  logger.debug(`Spawning ShellCheck '${bin}' with '${shellcheckArgs}'`);
  return child_process.spawnSync(bin, shellcheckArgs, {
    ...(args?.stdio && { stdio: args.stdio })
  });
}
