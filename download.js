const https = require('https');
const fs = require('fs');

const url = `https://storage.googleapis.com/shellcheck/shellcheck-latest.${process.platform}.x86_64.tar.xz`;
https
  .get(url, res => {
    res.pipe(process.stdout);
  })
  .on('error', err => {
    console.log('Error: ' + err.message);
  });
