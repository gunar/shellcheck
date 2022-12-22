import process from 'node:process';
import url from 'node:url';
import https from 'node:https';
import type { Release, ReleaseVersion } from '~/types';
import { config } from '~/configs';
import { InternalError, ReleaseError } from '~/errors';
import { logger } from '~/logger';
import { shellCheckPlatform } from './shellCheckPlatform';
import { shellCheckArchitecture } from './shellCheckArchitecture';

/**
 * Build URL arguments.
 */
export type BuildURLArgs = {
  /**
   * Base URL.
   */
  baseURL?: string;
  /**
   * Release.
   */
  release?: Release;
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
 * Find latest release version.
 *
 * @returns Latest release version.
 */
function findLatestReleaseVersion(): Promise<ReleaseVersion> {
  logger.debug('Finding latest release version');

  return new Promise((resolve, reject) => {
    https
      .get(config.apiURL, { headers: { 'User-Agent': 'Node.js' } }, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          try {
            const dataJSON = JSON.parse(data);
            // eslint-disable-next-line @typescript-eslint/naming-convention
            const { tag_name: version }: { tag_name?: ReleaseVersion } =
              dataJSON;

            if (!version)
              reject(
                new ReleaseError(
                  `Unable to determine latest release version because 'tag_name' is missing`
                )
              );
            else {
              logger.debug(`Latest release version is '${version}'`);
              resolve(version);
            }
          } catch (err) {
            reject(err);
          }
        });
      })
      .on('error', (err) => reject(err));
  });
}

/**
 * Build URL.
 *
 * @param args - Arguments.
 * @returns Download URL.
 */
export async function buildURL(args?: BuildURLArgs): Promise<url.URL> {
  logger.debug(`Building URL: ${JSON.stringify(args)}`);

  const platform = args?.platform ?? process.platform;
  const shellcheckPlatform = shellCheckPlatform({ platform });
  const architecture = args?.architecture ?? process.arch;
  const shellcheckArchitecture = shellCheckArchitecture({
    platform,
    architecture
  });
  const archive = config.binaries[platform]?.archive;
  if (archive === undefined)
    throw new InternalError(`No archive for platform '${platform}'`);
  const downloadURL = args?.baseURL ?? config.downloadURL;
  const release =
    !args?.release || args?.release === 'latest'
      ? await findLatestReleaseVersion()
      : args.release;

  return new url.URL(
    `${downloadURL}/${release}/shellcheck-${release}.${
      shellcheckPlatform !== '' ? `${shellcheckPlatform}.` : ''
    }${
      shellcheckArchitecture !== '' ? `${shellcheckArchitecture}.` : ''
    }${archive}`
  );
}
