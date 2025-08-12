import { shellCheckPlatform } from '~/utils/index.js';
import { PlatformError } from '~/errors/index.js';
import {
  PLATFORMS_NOT_SUPPORTED,
  PLATFORMS_SUPPORTED,
} from '../helpers/index.js';

describe('Platform', () => {
  it.each(PLATFORMS_SUPPORTED)(
    `should succeed supporting platform '%s'`,
    platform => {
      expect(() => shellCheckPlatform({ platform })).not.toThrow();
    },
  );

  it.each(PLATFORMS_NOT_SUPPORTED)(
    `should fail supporting platform '%s'`,
    platform => {
      expect(() => shellCheckPlatform({ platform })).toThrow(PlatformError);
    },
  );
});
