import type fs from 'node:fs';
import type {
  NonEmptyArray,
  ShellCheckArchitecture,
  ShellCheckPlatform
} from '~/types';

/**
 * Configuration.
 */
export type Config = {
  /**
   * Access permissions.
   */
  mode: fs.Mode;
  /**
   * Download URL.
   */
  downloadURL: string;
  /**
   * GitHub API URL.
   */
  apiURL: string;
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
        platform: ShellCheckPlatform;
        /**
         * ShellCheck architectures.
         */
        architectures: NonEmptyArray<
          [NodeJS.Architecture, ShellCheckArchitecture]
        >;
        /**
         * Archive.
         */
        archive: 'tar.xz' | 'zip';
      }
    >
  >;
};

/**
 * Configuration.
 */
export const config: Config = {
  mode: 0o755,
  downloadURL: `https://github.com/koalaman/shellcheck/releases/download`,
  apiURL: `https://api.github.com/repos/koalaman/shellcheck/releases/latest`,
  binaries: {
    linux: {
      platform: 'linux',
      architectures: [
        ['x64', 'x86_64'],
        ['arm64', 'aarch64']
      ],
      archive: 'tar.xz'
    },
    darwin: {
      platform: 'darwin',
      architectures: [['x64', 'x86_64']],
      archive: 'tar.xz'
    },
    win32: { platform: '', architectures: [['x64', '']], archive: 'zip' }
  }
};
