#!/usr/bin/env node
'use strict';

require('../build')
  .shellcheck({ stdio: 'inherit' })
  .then((shellcheck) => {
    // Check error
    if (shellcheck.error) throw shellcheck.error;

    // Print stdout
    if (shellcheck.stdout) process.stdout.write(shellcheck.stdout);
    // Print stderr
    if (shellcheck.stderr) process.stderr.write(shellcheck.stderr);

    // Exit
    process.exit(shellcheck.status ?? 1);
  })
  .catch((err) => {
    throw err;
  });
