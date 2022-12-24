import process from 'node:process';
import url from 'node:url';
import type { Release, ReleaseVersion } from '~/types';
import { config } from '~/configs';
import { InternalError, ReleaseError } from '~/errors';
import { logger } from '~/logger';
import { shellCheckPlatform } from './shellCheckPlatform';
import { shellCheckArchitecture } from './shellCheckArchitecture';
import { requestJSON } from './request';

/**
 * Build URL arguments.
 */
export type BuildURLArgs = {
  /**
   * Base URL.
   */
  baseURL?: url.URL;
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
 * Find latest release version arguments.
 */
type FindLatestReleaseVersionArgs = {
  /**
   * URL.
   */
  url: url.URL;
};

/**
 * Find latest release version.
 *
 * @returns Latest release version.
 */
async function findLatestReleaseVersion(
  args?: FindLatestReleaseVersionArgs
): Promise<ReleaseVersion> {
  const opts: Required<FindLatestReleaseVersionArgs> = {
    url: args?.url || config.apiURL
  };
  logger.debug(`Finding latest release version from ${opts.url}`);

  const data = await requestJSON<{ tag_name?: ReleaseVersion }>({
    url: opts.url
  });

  if (!data.tag_name)
    throw new ReleaseError(
      `Unable to determine latest release version because 'tag_name' is missing`
    );

  logger.debug(`Latest release version is '${data.tag_name}'`);
  return data.tag_name;
}

/**
 * Build URL.
 *
 * @param args - Arguments.
 * @returns Download URL.
 */
export async function buildURL(args?: BuildURLArgs): Promise<url.URL> {
  const opts: Required<BuildURLArgs> = {
    baseURL: args?.baseURL ?? config.downloadURL,
    release:
      !args?.release || args?.release === 'latest'
        ? await findLatestReleaseVersion()
        : args.release,
    platform: args?.platform ?? process.platform,
    architecture: args?.architecture ?? process.arch
  };
  logger.debug(`Building URL: ${JSON.stringify(opts)}`);

  const platform = shellCheckPlatform({ platform: opts.platform });
  const architecture = shellCheckArchitecture({
    platform: opts.platform,
    architecture: opts.architecture
  });
  const archive = config.binaries[opts.platform]?.archive;
  if (archive === undefined)
    throw new InternalError(`No archive for platform '${opts.platform}'`);

  return new url.URL(
    `${opts.baseURL}/${opts.release}/shellcheck-${opts.release}.${
      platform !== '' ? `${platform}.` : ''
    }${architecture !== '' ? `${architecture}.` : ''}${archive}`
  );
}
