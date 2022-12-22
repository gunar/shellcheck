import fs from 'node:fs';
import process from 'node:process';
import path from 'node:path';
import type url from 'node:url';
import decompress from 'decompress';
import decompressTarxz from 'decompress-tarxz';
import decompressUnzip from 'decompress-unzip';
import { config } from '~/configs';
import { logger } from '~/logger';
import { mkdtemp } from './mkdtemp';
import { buildURL } from './buildURL';
import { binName } from './binName';
import { downloadFile } from './downloadFile';

/**
 * Download arguments.
 */
export type DownloadArgs = {
  /**
   * URL.
   */
  url?: url.URL;
  /**
   * Destination path.
   */
  destination: string;
  /**
   * OS platform.
   */
  platform?: NodeJS.Platform;
  /**
   * CPU architecture.
   */
  architecture?: NodeJS.Architecture;
};

/**
 * Download ShellCheck.
 *
 * @param args - Arguments.
 */
export async function download(args: DownloadArgs): Promise<void> {
  let tmpDir: string | undefined;
  const platform = args.platform ?? process.platform;
  const architecture = args.architecture ?? process.arch;
  const bin = binName({ platform });

  try {
    // Temporary directory
    logger.debug(`Creating temporary directory`);
    tmpDir = await mkdtemp();
    logger.debug(`Temporary directory: '${tmpDir}'`);

    const archive = path.normalize(`${tmpDir}/shellcheck.download`);
    const shellcheck = path.normalize(`${tmpDir}/${bin}`);

    // Build URL
    logger.debug(`Obtaining download URL`);
    const downloadURL =
      args.url ?? (await buildURL({ platform, architecture }));

    // Download
    logger.info(`Downloading '${downloadURL}' to '${archive}'`);
    await downloadFile({ url: downloadURL, destination: archive });

    // Extract
    logger.info(`Extracting '${archive}' to '${path.dirname(shellcheck)}'`);
    await decompress(archive, path.dirname(shellcheck), {
      plugins: [decompressTarxz(), decompressUnzip()],
      strip: 1,
      filter: (file) => file.path === bin
    });

    // Permissions
    logger.debug(
      `Changing permissions '${config.mode.toString(8)}' of '${shellcheck}'`
    );
    fs.chmodSync(shellcheck, config.mode);

    // Move
    logger.info(`Moving '${shellcheck}' to '${args.destination}'`);
    fs.renameSync(shellcheck, args.destination);
  } finally {
    if (tmpDir) {
      try {
        logger.debug(`Removing temporary directory '${tmpDir}'`);
        fs.rmSync(tmpDir, { recursive: true, force: true });
      } catch (_) {
        /* empty */
      }
    }
  }
}
