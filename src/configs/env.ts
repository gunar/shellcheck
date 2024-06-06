import * as envalid from 'envalid';
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

export const env = envalid.cleanEnv(process.env, {
  [`${ENV_PREFIX}_RELEASE`]: releaseValidator<Release>({
    default: 'latest',
    desc: 'Release version or latest',
    example: '`latest` or `v0.10.0`',
    docs: 'https://github.com/koalaman/shellcheck/releases'
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
