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
  curl --disable --silent --show-error --fail --location --remote-name "$1"
}

wget_get() {
  wget --no-config --no-verbose "$1"
}

# Download
"$(http_client)_get" https://storage.googleapis.com/shellcheck/shellcheck-latest.linux.x86_64.tar.xz

# Extract
tar xf shellcheck-latest.linux.x86_64.tar.xz

# Clean up
rm shellcheck-latest.linux.x86_64.tar.xz
