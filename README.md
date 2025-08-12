<!-- markdownlint-disable MD033 -->

# shellcheck

[![ci](https://github.com/gunar/shellcheck/actions/workflows/ci.yml/badge.svg)](https://github.com/gunar/shellcheck/actions/workflows/ci.yml)
[![codeql](https://github.com/gunar/shellcheck/actions/workflows/codeql.yml/badge.svg)](https://github.com/gunar/shellcheck/actions/workflows/codeql.yml)

[ShellCheck](https://www.shellcheck.net) - A shell script static analysis tool.

Downloads the most recent version of [koalaman](https://github.com/koalaman)'s [ShellCheck](https://www.shellcheck.net).

## Installation

> **Warning**: Node.js version `>= 20.9.0` is required

```sh
npm install --save-dev shellcheck
```

## Usage

> **Note**: On first execution `shellcheck` it's automatically downloaded

> **Note**: It's recommended to execute `shellcheck` using [`npx`](https://docs.npmjs.com/cli/commands/npx)

> **Note**: Proxy support via `HTTP_PROXY`, `HTTPS_PROXY` and `NO_PROXY` environment variables

> **Note**: By default, all GitHub requests are anonymous. If you encounter error `403 | rate limit exceeded` (e.g., in CI), set the environment variable `GITHUB_TOKEN` to use your own personal access token

Execute `shellcheck` directly from your npm scripts:

```json
{
  "scripts": {
    "lint": "npx shellcheck path/to/script.sh"
  }
}
```

### Environment Variables

| **Name**                    | **Values**                                                 | **Default**                                                                   | **Description**                                                        |
| :-------------------------- | :--------------------------------------------------------- | :---------------------------------------------------------------------------- | :--------------------------------------------------------------------- |
| `SHELLCHECKJS_RELEASE`      | `latest` \| `v(0\|[1-9]\d*)\.(0\|[1-9]\d*)\.(0\|[1-9]\d*)` | `latest`                                                                      | Release version. See <https://github.com/koalaman/shellcheck/releases> |
| `SHELLCHECK_BIN`            | Any valid path to an executable binary file                | _linux_ or _darwin_: `./bin/shellcheck` <br/> _win32_: `.\bin\shellcheck.exe` | ShellCheck executable binary path                                      |
| `SHELLCHECKJS_LOGGER_LEVEL` | `off` \| `debug` \| `info` \| `warn` \| `error`            | `info`                                                                        | Logger level                                                           |

### Programmatic

> **Note**: More _functions_, _utilities_, and _constants_ are available

```ts
import { shellcheck, download, config } from 'shellcheck';

/**
 * Spawn ShellCheck.
 * Download ShellCheck if not found or invalid.
 */
await shellcheck({
  args: ['path/to/script.sh', 'path/to/another/script.sh'],
  // Options...
})
  .then(result => {
    // Check error
    if (result.error) throw result.error;

    // Print stdout
    if (result.stdout) console.log(result.stdout.toString('utf8'));
    // Print stderr
    if (result.stderr) console.error(result.stderr.toString('utf8'));

    // Exit code
    if (result?.status !== 0) throw new Error(`Exit code: ${result?.status}`);
  })
  .catch(err => {
    console.error(`Error: ${err}`);
    throw err;
  });

/**
 * Download ShellCheck.
 */
await download({
  destination: `path/to/destination/shellcheck`,
  // destination: `path\\to\\destination\\shellcheck.exe` // Windows
  // Options...
});
```

## Compatibility

> **Note**: [`Platform`](https://nodejs.org/api/process.html#processplatform) and [`Architecture`](https://nodejs.org/api/process.html#processarch) follow _Node.js_ naming convention

| **Platform** | **Architecture** |
| ------------ | ---------------- |
| `linux`      | `x64`            |
| `linux`      | `arm64`          |
| `linux`      | `riscv64`        |
| `darwin`     | `x64`            |
| `darwin`     | `arm64`          |
| `win32`      | `x64`            |

## Contributing

I would love to see your contribution :heart:

See [CONTRIBUTING](./CONTRIBUTING.md) guidelines.

## License

This project is licensed under the [MIT](https://opensource.org/licenses/MIT) License. \
See [LICENSE](./LICENSE) file for details.
