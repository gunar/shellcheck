#!/bin/sh -e

# Download
File=shellcheck-latest.linux.x86_64.tar.xz
curl -o $File https://storage.googleapis.com/shellcheck/$File
tar xf $File

# Clean up
rm -f $File
