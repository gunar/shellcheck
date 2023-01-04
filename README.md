# shellcheck

[![ci](https://github.com/gunar/shellcheck/actions/workflows/ci.yml/badge.svg)](https://github.com/gunar/shellcheck/actions/workflows/ci.yml)
[![codeql](https://github.com/gunar/shellcheck/actions/workflows/codeql.yml/badge.svg)](https://github.com/gunar/shellcheck/actions/workflows/codeql.yml)

[ShellCheck](https://www.shellcheck.net) - A shell script static analysis tool.

Downloads the most recent version of [koalaman](https://github.com/koalaman)'s [ShellCheck](https://www.shellcheck.net).

## Installation

```sh
npm install --save-dev shellcheck
```

## Usage

> **Note**: On first execution `shellcheck` it's automatically downloaded

> **Note**: It's recommended to execute `shellcheck` using [`npx`](docs.npmjs.com/cli/commands/npx)

Execute `shellcheck` directly from your npm scripts:

```json
{
  "scripts": {
    "lint": "npx shellcheck script.sh"
  }
}
```

## License

This project is licensed under the [MIT](https://opensource.org/licenses/MIT) License. \
See [LICENSE](./LICENSE) file for details.
