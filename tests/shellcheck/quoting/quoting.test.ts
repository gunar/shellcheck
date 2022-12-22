import path from 'node:path';
import { shellcheck } from '~/index';

const SCRIPT_FILE = path.normalize(`${__dirname}/quoting.sh`);

describe('Quoting', () => {
  it('should fail ShellCheck checks', async () => {
    const spawn = await shellcheck({ args: [SCRIPT_FILE] });

    expect(spawn.error).toBeUndefined();
    expect(spawn.status).not.toBe(0);
    expect(Buffer.byteLength(spawn.stdout)).not.toBe(0);
    expect(Buffer.byteLength(spawn.stderr)).toBe(0);
    expect(spawn.stdout.toString().replace(/\n/g, '')).toEqual(`\
\
In ${SCRIPT_FILE} line 7:\
for f in "*.ogg"                  # Incorrectly quoted 'for' loops\
^-- SC1073 (error): Couldn't parse this for loop. Fix to allow more checks.\
\
\
In ${SCRIPT_FILE} line 8:\
touch $@                          # Unquoted $@\
^-- SC1058 (error): Expected 'do'.\
^-- SC1072 (error): Expected 'do'. Fix any mentioned problems and try again.\
\
For more information:\
  https://www.shellcheck.net/wiki/SC1058 -- Expected 'do'.\
  https://www.shellcheck.net/wiki/SC1072 -- Expected 'do'. Fix any mentioned ...\
  https://www.shellcheck.net/wiki/SC1073 -- Couldn't parse this for loop. Fix...\
`);
  });
});
