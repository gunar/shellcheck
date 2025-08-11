import { shellcheck } from '~/shellcheck.js';

// eslint-disable-next-line import/no-default-export
export default async () => {
  await shellcheck({ args: [] });
};
