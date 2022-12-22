import { shellcheck } from '~/index';

// eslint-disable-next-line import/no-default-export
export default async () => {
  await shellcheck({ args: [] });
};
