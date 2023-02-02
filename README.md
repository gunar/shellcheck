# shellcheck

[![ci](https://github.com/gunar/shellcheck/actions/workflows/ci.yml/badge.svg)](https://github.com/gunar/shellcheck/actions/workflows/ci.yml)
[![codeql](https://github.com/gunar/shellcheck/actions/workflows/codeql.yml/badge.svg)](https://github.com/gunar/shellcheck/actions/workflows/codeql.yml)

[ShellCheck](https://www.shellcheck.net) - A shell script static analysis tool.

Downloads the most recent version of [koalaman](https://github.com/koalaman)'s [ShellCheck](https://www.shellcheck.net).

## Installation

> **Warning**: Node.js version `>= 18.4.0 || >= 16.17.0` is required

```sh
npm install --save-dev shellcheck
```

## Usage

> **Note**: On first execution `shellcheck` it's automatically downloaded

> **Note**: It's recommended to execute `shellcheck` using [`npx`](https://docs.npmjs.com/cli/commands/npx)

> **Note**: By default, all GitHub requests are anonymous. If you encounter error `403 | rate limit exceeded` (e.g., in CI), set the environment variable `GITHUB_TOKEN` to use your own personal access token

Execute `shellcheck` directly from your npm scripts:

```json
{
  "scripts": {
    "lint": "npx shellcheck path/to/script.sh"
  }
}
```

### Programmatic

> **Note**: More _functions_, _utilities_, and _constants_ are available

```ts
import { shellcheck, download, config } from 'shellcheck';

/**
 * Spawn ShellCheck.
 * Download ShellCheck if not found or invalid.
 */
await shellcheck({
  // Options..
});

/**
 * Download ShellCheck.
 */
await download({
  destination: `path/to/destination/shellcheck`
  // destination: `path/to/destination/${config.bin}` // Platform-dependent name (add .exe on Windows)
  // Options...
});
```

## Compatibility

> **Note**: [`Platform`](https://nodejs.org/api/process.html#processplatform) and [`Architecture`](https://nodejs.org/api/process.html#processarch) follow _Node.js_ naming convention

| **Platform** | **Architecture** | **Notes**                                                                                                                                                                                                                                                                                                       |
| ------------ | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `linux`      | `arm64`          |
| `linux`      | `x64`            |
| `darwin`     | `x64`            |
| `darwin`     | `arm64`          | [Rosetta 2](https://support.apple.com/HT211861) must be installed. There is no native binary for `darwin arm64` at the moment (see [this](https://github.com/koalaman/shellcheck/issues/2109)). As a result, the downloaded binary is for `x64`, and `Rosetta 2` translates it to operate with `Apple Silicon`. |
| `win32`      | `x64`            |

## Contributing

I would love to see your contribution :heart:

See [CONTRIBUTING](./CONTRIBUTING.md) guidelines.

## License

This project is licensed under the [MIT](https://opensource.org/licenses/MIT) License. \
See [LICENSE](./LICENSE) file for details.
