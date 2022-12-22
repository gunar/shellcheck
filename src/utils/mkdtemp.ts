import os from 'node:os';
import path from 'node:path';
import fs from 'node:fs';

/**
 * Creates a unique temporary directory.
 *
 * @returns Temporary directory path.
 */
export function mkdtemp(): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.mkdtemp(`${os.tmpdir()}${path.sep}`, (err, directory) => {
      if (err) reject(err);
      else resolve(directory);
    });
  });
}
