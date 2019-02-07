#!/bin/sh -e

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

tarball_url=https://storage.googleapis.com/shellcheck/shellcheck-latest.linux.x86_64.tar.xz

# Download & Extract
tar_options=$([[ "$(tar --version)" = bsdtar* ]] && echo -xz || echo -xJ)
"$(http_client)_get" "$tarball_url" | tar $tar_options
