#!/usr/bin/env bash

set -e

[ -z "$DEBUG" ] || { export PS4='+ [shellcheck/${BASH_SOURCE##*/}:${LINENO}] '; set -x; }

http_client() {
  for client in curl wget; do
    if type "$client" >/dev/null 2>/dev/null; then
      echo "$client"
      return
    fi
  done
  echo "error: please install \`curl\` or \`wget\` and try again" >&2
  return 1
}

curl_get() {
  curl --disable --silent --show-error --fail --location "$1"
}

wget_get() {
  wget -q -O - "$1"
}

tar_options() {
  if [[ "$(tar --version)" = bsdtar* ]]; then
    echo -xz
  else
    echo -xJ
  fi
}

tarball_url=https://storage.googleapis.com/shellcheck/shellcheck-latest.linux.x86_64.tar.xz

# Download & Extract
"$(http_client)_get" "$tarball_url" | tar "$(tar_options)"
