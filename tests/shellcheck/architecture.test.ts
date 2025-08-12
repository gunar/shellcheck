import { shellCheckArchitecture } from '~/utils/index.js';
import { ArchitectureError } from '~/errors/index.js';
import {
  ARCHITECTURES_SUPPORTED,
  ARCHITECTURES_NOT_SUPPORTED,
} from '../helpers/index.js';

describe('Architecture', () => {
  it.each(
    Object.entries(ARCHITECTURES_SUPPORTED)
      .filter(([, architectures]) => architectures.length > 0)
      .reduce<Array<[NodeJS.Platform, NodeJS.Architecture]>>(
        (accumulator, current) => {
          current[1].forEach(architecture => {
            accumulator.push([current[0] as NodeJS.Platform, architecture]);
          });
          return accumulator;
        },
        [],
      ),
  )(
    `should succeed supporting platform '%s' architecture '%s'`,
    (platform, architecture) => {
      expect(() =>
        shellCheckArchitecture({ platform, architecture }),
      ).not.toThrow();
    },
  );

  it.each(
    Object.entries(ARCHITECTURES_NOT_SUPPORTED)
      .filter(([, architectures]) => architectures.length > 0)
      .reduce<Array<[NodeJS.Platform, NodeJS.Architecture]>>(
        (accumulator, current) => {
          current[1].forEach(architecture => {
            accumulator.push([current[0] as NodeJS.Platform, architecture]);
          });
          return accumulator;
        },
        [],
      ),
  )(
    `should fail supporting platform '%s' architecture '%s'`,
    (platform, architecture) => {
      expect(() => shellCheckArchitecture({ platform, architecture })).toThrow(
        ArchitectureError,
      );
    },
  );
});
