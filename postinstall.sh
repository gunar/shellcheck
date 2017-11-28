#!/bin/sh

# Download
wget https://storage.googleapis.com/shellcheck/shellcheck-latest.linux.x86_64.tar.xz
tar xf shellcheck-latest.linux.x86_64.tar.xz

# "Install"
ln -fs "$(readlink -f ./shellcheck-latest/shellcheck)" $(npm bin)/shellcheck

# Clean up
rm shellcheck-latest.linux.x86_64.tar.xz
