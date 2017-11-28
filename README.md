# shellcheck (a wrapper for npm)

All I've done is wrap [koalaman's shellcheck](https://www.shellcheck.net/) in a
`package.json`.

## Why?

Sometimes there is no other option than to add a shell script to your node
package.

This wrapper allows you to "lint" JS and SH altogether.


## How?

Installing the package downloads the latest version of `shellcheck` from the
official servers.

```sh
npm install --dev shellcheck
```

Now you can call `shellcheck` from your npm scripts in `package.json`.

```json
{
  "scripts": {
    "lint-js": "eslint --cache --ignore-path .gitignore .",
    "lint-sh": "shellcheck **/*.sh",
    "lint": "lint-js && lint-sh"
  }
}
```

## License

MIT [http://gunar.mit-license.org]()
