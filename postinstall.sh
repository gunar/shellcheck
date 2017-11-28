#!/bin/sh -e

# Download
wget https://storage.googleapis.com/shellcheck/shellcheck-latest.linux.x86_64.tar.xz
tar xf shellcheck-latest.linux.x86_64.tar.xz

# Clean up
rm shellcheck-latest.linux.x86_64.tar.xz
