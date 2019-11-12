#!/usr/bin/env bash

set -e

[ -z "$DEBUG" ] || { export PS4='+ [shellcheck/${BASH_SOURCE##*/}:${LINENO}] '; set -x; }

tar_options() {
  if [[ "$(tar --version)" = bsdtar* ]]; then
    echo -xz
  else
    echo -xJ
  fi
}

# Download & Extract
node download.js | tar "$(tar_options)"
