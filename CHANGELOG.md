<!-- markdownlint-disable MD024 -->

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Archive (`tar.xz` or `zip`) in configuration

### Changed

- **ESM-only** due to `decompress` plugins

- Default configuration download URL is official <https://github.com/koalaman/shellcheck/releases/download>

- Default API URL is official <https://api.github.com/repos/koalaman/shellcheck/releases/latest>

- Configuration of `platform` and `architectures` accepts an empty string if the value is not available

- `buildURL` argument `archive` only accepts `tar.xz` or `zip`, not a generic `string`

### Deprecated

- Drop support for _Node.js_ versions that do not match `>=20.9.0`

## [v3.1.0](https://github.com/gunar/shellcheck/releases/tag/v3.1.0) - 2025-01-31

### Added

- Configure binary path via environment variable `SHELLCHECKJS_BIN`

### Removed

- `binDir` configuration option. Configuration `bin` now contains the complete path to the ShellCheck executable binary (including both binary directory and binary name)

## [v3.0.0](https://github.com/gunar/shellcheck/releases/tag/v3.0.0) - 2024-06-06

### Added

- Configure release version via environment variable `SHELLCHECKJS_RELEASE`

- Configure logger level via environment variable `SHELLCHECKJS_LOGGER_LEVEL`

### Deprecated

- Drop support for _Node.js_ versions that do not match `>=18.12.0`

## [v2.2.0](https://github.com/gunar/shellcheck/releases/tag/v2.2.0) - 2023-02-04

### Changed

- `darwin` (`arm64`) support with native binary

- Proxy address environment variable name(s) reverted to old and standard behaviour

- ShellCheck binaries download from <https://github.com/vscode-shellcheck/shellcheck-binaries/releases> and no more from <https://github.com/koalaman/shellcheck/releases>

### Removed

- Problematic and unused decompression libraries

## [v2.1.0](https://github.com/gunar/shellcheck/releases/tag/v2.1.0) - 2023-02-02

### Added

- `darwin` (`arm64`) support via [Rosetta 2](https://support.apple.com/HT211861)

## [v2.0.0](https://github.com/gunar/shellcheck/releases/tag/v2.0.0) - 2023-01-31

### Added

- `linux` (`arm64` and `x86`), `darwin` (`x86`) and `win32` (`x86`) support

- Programmatic usage

- `TypeScript` support

- Tests

### Changed

- Download `ShellCheck` binary only when calling `npx shellcheck` for the first time

### Deprecated

- Drop support for all _Node.js_ versions that do not match `>=18.4.0 || >=16.17.0`

### Removed

- Non Node.js dependency

- Script (`.sh`)
