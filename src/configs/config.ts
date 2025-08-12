import type fs from 'node:fs';
import url from 'node:url';
import type {
  NonEmptyArray,
  Release,
  ShellCheckArchitecture,
  ShellCheckArchive,
  ShellCheckPlatform,
} from '~/types/index.js';
import { LoggerLevel } from '~/logger/LoggerLevel.js';
import { env } from './env.js';

/**
 * Configuration.
 */
export type Config = {
  /**
   * Binary path.
   */
  bin: string;
  /**
   * Access permissions.
   */
  mode: fs.Mode;
  /**
   * Download URL.
   */
  downloadURL: url.URL;
  /**
   * GitHub API URL.
   */
  apiURL: url.URL;
  /**
   * Release.
   */
  release: Release;
  /**
   * Supported ShellCheck binaries.
   */
  binaries: Partial<
    Record<
      NodeJS.Platform,
      {
        /**
         * ShellCheck platform.
         */
        platform: ShellCheckPlatform | '';
        /**
         * ShellCheck archive.
         */
        archive: ShellCheckArchive;
        /**
         * ShellCheck architectures.
         */
        architectures: NonEmptyArray<
          [NodeJS.Architecture, ShellCheckArchitecture | '']
        >;
      }
    >
  >;
  /**
   * Logger.
   */
  logger: {
    /**
     * Logger level.
     */
    level: LoggerLevel;
  };
};

/**
 * Configuration.
 */
export const config: Config = {
  bin: env.SHELLCHECKJS_BIN,
  mode: 0o755,
  downloadURL: new url.URL(
    `https://github.com/koalaman/shellcheck/releases/download`,
  ),
  apiURL: new url.URL(
    `https://api.github.com/repos/koalaman/shellcheck/releases/latest`,
  ),
  release: env.SHELLCHECKJS_RELEASE,
  binaries: {
    linux: {
      platform: 'linux',
      archive: 'tar.xz',
      architectures: [
        ['x64', 'x86_64'],
        ['arm64', 'aarch64'],
      ],
    },
    darwin: {
      platform: 'darwin',
      archive: 'tar.xz',
      architectures: [
        ['x64', 'x86_64'],
        ['arm64', 'aarch64'],
      ],
    },
    win32: {
      platform: '',
      archive: 'zip',
      architectures: [['x64', '']],
    },
  },
  logger: { level: env.SHELLCHECKJS_LOGGER_LEVEL },
};
