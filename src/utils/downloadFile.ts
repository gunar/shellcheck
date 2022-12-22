import https from 'node:https';
import fs from 'node:fs';
import type url from 'node:url';
import { DownloadError } from '~/errors';
import { logger } from '~/logger';

/**
 * Download file arguments.
 */
export type DownloadFileArgs = {
  /**
   * URL.
   */
  url: url.URL;
  /**
   * Destination path.
   */
  destination: string;
};

/**
 * Download file.
 *
 * @param args - Arguments.
 */
export function downloadFile(args: DownloadFileArgs): Promise<void> {
  logger.debug(`Downloading file: ${JSON.stringify(args)}`);

  return new Promise((resolve, reject) => {
    https
      .get(args.url, { headers: { 'User-Agent': 'Node.js' } }, async (res) => {
        const statusCode = res.statusCode ?? 0;

        if (statusCode >= 400) {
          reject(
            new DownloadError(
              `Received status code '${statusCode}' and message '${
                res.statusMessage ?? ''
              }'`
            )
          );
        } else if (
          statusCode >= 300 &&
          statusCode < 400 &&
          res.headers.location
        ) {
          // Redirect
          try {
            logger.debug(
              `Redirect from '${args.url}' to '${res.headers.location}'`
            );
            await downloadFile({
              url: new URL(res.headers.location),
              destination: args.destination
            });
            resolve();
          } catch (err) {
            reject(err);
          }
        } else {
          // Save file
          const fileStream = fs
            .createWriteStream(args.destination)
            .on('finish', () => {
              fileStream.close((err) => {
                if (err) reject(err);
                else resolve();
              });
            });
          res.pipe(fileStream);
        }
      })
      .on('error', (err) => reject(err));
  });
}
