#!/usr/bin/env node
'use strict';

const app = require('../build');

app
  .shellcheck({ stdio: 'inherit' })
  .then((shellcheck) => {
    // Check error
    if (shellcheck.error) throw shellcheck.error;
    // Stdout
    if (shellcheck.stdout) process.stdout.write(shellcheck.stdout);
    // Stderr
    if (shellcheck.stderr) process.stderr.write(shellcheck.stderr);

    // Exit
    process.exit(shellcheck.status ?? 1);
  })
  .catch((err) => {
    app.logger.error('Error spawning ShellCheck: ' + err);
    throw err;
  });
