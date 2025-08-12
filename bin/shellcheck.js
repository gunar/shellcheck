#!/usr/bin/env node
'use strict';

import { shellcheck } from '../build/shellcheck.js';

shellcheck({ stdio: 'inherit' })
  .then(result => {
    // Check error
    if (result.error) throw result.error;

    // Print stdout
    if (result.stdout) process.stdout.write(result.stdout);
    // Print stderr
    if (result.stderr) process.stderr.write(result.stderr);

    // Exit
    process.exit(result.status ?? 1);
  })
  .catch(err => {
    throw err;
  });
