import * as envalid from 'envalid';
import path from 'node:path';
import fs from 'node:fs';
import type { Release } from '~/types';
import { LoggerLevel } from '~/logger/LoggerLevel';
import { arrayOfAll } from '~/utils/arrayOfAll';
import { Narrow } from '~/utils/narrow';

const ENV_PREFIX = 'SHELLCHECKJS';

const RELEASE_REGEX = /(^latest$|^v(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$)/;

const releaseValidator = envalid.makeValidator<Release>((input: string) => {
  if (!RELEASE_REGEX.test(input)) {
    throw new envalid.EnvError(`Invalid release: ${input}`);
  }
  Narrow<Release>(input);

  return input;
});

const binValidator = envalid.makeValidator<string>((input: string) => {
  try {
    fs.accessSync(
      input,
      // eslint-disable-next-line no-bitwise
      fs.constants.F_OK | fs.constants.W_OK | fs.constants.X_OK
    );
  } catch (err: unknown) {
    throw new envalid.EnvError(
      `Invalid ShellCheck binary: ${err instanceof Error ? err.message : err}`
    );
  }

  return input;
});

export const env = envalid.cleanEnv(process.env, {
  [`${ENV_PREFIX}_RELEASE`]: releaseValidator({
    default: 'latest',
    desc: 'Release version or latest',
    example: '`latest` or `v0.10.0`',
    docs: 'https://github.com/koalaman/shellcheck/releases'
  }),
  [`${ENV_PREFIX}_BIN`]: binValidator({
    default: path.normalize(
      path.resolve(
        `${__dirname}/../../bin`,
        `shellcheck${process.platform === 'win32' ? '.exe' : ''}`
      )
    ),
    desc: 'ShellCheck binary path',
    example: '`/path/to/shellcheck` or `C:\\path\\to\\shellcheck.exe`'
  }),
  [`${ENV_PREFIX}_LOGGER_LEVEL`]: envalid.str<LoggerLevel>({
    default: LoggerLevel.INFO,
    choices: arrayOfAll<LoggerLevel>()([
      LoggerLevel.OFF,
      LoggerLevel.DEBUG,
      LoggerLevel.INFO,
      LoggerLevel.WARN,
      LoggerLevel.ERROR
    ]),
    desc: 'Logger level',
    example: '`info`'
  })
});
