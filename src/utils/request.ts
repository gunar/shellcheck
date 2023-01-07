import 'global-agent/bootstrap';
import fs from 'node:fs';
import https from 'node:https';
import type http from 'node:http';
import type url from 'node:url';
import { RequestError } from '~/errors';
import { logger } from '~/logger';

/**
 * Request arguments.
 */
export type RequestArgs<T> = {
  /**
   * URL.
   */
  url: url.URL;
  /**
   * User agent.
   */
  userAgent?: string;
  /**
   * Token.
   */
  token?: string;
  /**
   * Callback.
   */
  cb: (res: http.IncomingMessage) => T | Promise<T>;
};

/**
 * Request.
 *
 * @param args - Arguments.
 * @returns T.
 */
export async function request<T>(args: RequestArgs<T>): Promise<T> {
  const opts: Required<Omit<RequestArgs<T>, 'token'>> & { token?: string } = {
    url: args.url,
    userAgent: args.userAgent ?? 'Node.js',
    token: args.token,
    cb: args.cb
  };

  logger.debug(`Request: ${JSON.stringify(opts)}`);
  return new Promise((resolve, reject) => {
    https
      .get(
        opts.url,
        {
          headers: {
            'User-Agent': opts.userAgent,
            ...(opts.token && { Authorization: `Bearer ${opts.token}` })
          }
        },
        async (res) => {
          const statusCode = res.statusCode ?? 0;

          if (statusCode >= 400) {
            reject(
              new RequestError(
                `Status code '${statusCode}' and message '${
                  res.statusMessage ?? ''
                }'`
              )
            );
          } else if (
            statusCode >= 300 &&
            statusCode < 400 &&
            res.headers.location
          ) {
            // Redirect
            try {
              logger.debug(
                `Redirect from '${opts.url}' to '${res.headers.location}'`
              );
              resolve(
                await request({
                  ...opts,
                  url: new URL(res.headers.location)
                })
              );
            } catch (err) {
              reject(new RequestError(`${err}`));
            }
          } else {
            res.on('error', (err) => reject(new RequestError(`${err}`)));

            try {
              resolve(await opts.cb(res));
            } catch (err) {
              reject(new RequestError(`${err}`));
            }
          }
        }
      )
      .on('error', (err) => reject(new RequestError(`${err}`)));
  });
}

/**
 * Request download arguments.
 */
export type RequestDownloadArgs = Omit<RequestArgs<void>, 'cb'> & {
  /**
   * Destination path.
   */
  destination: string;
};

/**
 * Request download.
 *
 * @param args - Arguments.
 */
export async function requestDownload(
  args: RequestDownloadArgs
): Promise<void> {
  logger.debug(`Request download: ${JSON.stringify(args)}`);

  return request({
    ...args,
    cb: (res) =>
      new Promise((resolve, reject) => {
        const fileStream = fs
          .createWriteStream(args.destination)
          .on('error', (err) => reject(new RequestError(`${err}`)))
          .on('finish', () => {
            fileStream.close((err) => {
              if (err) reject(new RequestError(`${err}`));
              else resolve();
            });
          });

        res.pipe(fileStream);
      })
  });
}

/**
 * Request download arguments.
 */
export type RequestJSONArgs<T> = Omit<RequestArgs<T>, 'cb'>;

/**
 * Request JSON.
 *
 * @param args - Arguments.
 * @returns T.
 */
export async function requestJSON<T>(args: RequestJSONArgs<T>): Promise<T> {
  logger.debug(`Request JSON: ${JSON.stringify(args)}`);

  return request({
    ...args,
    cb: (res) =>
      new Promise((resolve, reject) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch (err) {
            reject(new RequestError(`${err}`));
          }
        });
      })
  });
}
