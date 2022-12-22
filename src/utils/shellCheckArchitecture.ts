import process from 'node:process';
import { config } from '~/configs';
import { ArchitectureError } from '~/errors';

/**
 * ShellCheck Architecture arguments.
 */
export type ShellCheckArchitectureArgs = {
  /**
   * Architecture.
   */
  architecture?: NodeJS.Architecture;
  /**
   * Platform.
   */
  platform?: NodeJS.Platform;
};

/**
 * Convert architecture to ShellCheck architecture.
 *
 * @param args - Arguments.
 * @returns ShellCheck architecture.
 */
export function shellCheckArchitecture(args?: ShellCheckArchitectureArgs) {
  const architecture = config.binaries[
    args?.platform ?? process.platform
  ]?.architectures.find(
    (arch) => arch[0] === (args?.architecture ?? process.arch)
  )?.[1];

  if (architecture === undefined) throw new ArchitectureError();

  return architecture;
}
