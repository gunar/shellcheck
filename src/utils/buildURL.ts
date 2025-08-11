import process from 'node:process';
import url from 'node:url';
import type {
  Release,
  ReleaseVersion,
  ShellCheckArchive
} from '~/types/index.js';
import { config } from '~/configs/index.js';
import { ReleaseError } from '~/errors/index.js';
import { logger } from '~/logger/index.js';
import { shellCheckPlatform } from './shellCheckPlatform.js';
import { shellCheckArchitecture } from './shellCheckArchitecture.js';
import { requestJSON } from './request.js';
import { shellCheckArchive } from './shellCheckArchive.js';

/**
 * Build URL arguments.
 */
export type BuildURLArgs = {
  /**
   * Base URL.
   */
  baseURL?: url.URL;
  /**
   * Token.
   */
  token?: string;
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
  /**
   * Archive.
   */
  archive?: ShellCheckArchive;
};

/**
 * Find latest release version arguments.
 */
type FindLatestReleaseVersionArgs = {
  /**
   * URL.
   */
  url?: url.URL;
  /**
   * Token.
   */
  token?: string;
};

/**
 * Find latest release version.
 *
 * @returns Latest release version.
 */
async function findLatestReleaseVersion(
  args?: FindLatestReleaseVersionArgs
): Promise<ReleaseVersion> {
  const opts: Required<Omit<FindLatestReleaseVersionArgs, 'token'>> & {
    token?: string;
  } = {
    url: args?.url ?? config.apiURL,
    token: args?.token
  };
  logger.debug(`Finding latest release version from ${opts.url}`);

  const data = await requestJSON<{ tag_name?: ReleaseVersion }>({
    url: opts.url,
    token: opts.token
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
  const opts: Required<Omit<BuildURLArgs, 'token' | 'archive'>> &
    Pick<BuildURLArgs, 'archive'> = {
    baseURL: args?.baseURL ?? config.downloadURL,
    release:
      !args?.release || args?.release === 'latest'
        ? await findLatestReleaseVersion({ token: args?.token })
        : args.release,
    platform: args?.platform ?? process.platform,
    architecture: args?.architecture ?? process.arch,
    archive: args?.archive
  };
  logger.debug(`Building URL: ${JSON.stringify(opts)}`);

  const platform = shellCheckPlatform({ platform: opts.platform });
  const architecture = shellCheckArchitecture({
    platform: opts.platform,
    architecture: opts.architecture
  });
  const archive =
    opts.archive ?? shellCheckArchive({ platform: opts.platform });

  return new url.URL(
    `${opts.baseURL}/${opts.release}/shellcheck-${opts.release}${platform !== '' ? `.${platform}` : ''}${architecture !== '' ? `.${architecture}` : ''}.${archive}`
  );
}
