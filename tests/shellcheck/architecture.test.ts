import { shellCheckArchitecture } from '~/utils';
import { ArchitectureError } from '~/errors';
import { arrayOfAll } from '../utils';

const ARCHITECTURES: Array<NodeJS.Architecture> =
  arrayOfAll<NodeJS.Architecture>()([
    'arm',
    'arm64',
    'ia32',
    'mips',
    'mipsel',
    'ppc',
    'ppc64',
    's390',
    's390x',
    'x64'
  ]);

const DARWIN_ARCHITECTURES: Array<NodeJS.Architecture> = ['x64'];

const LINUX_ARCHITECTURES: Array<NodeJS.Architecture> = ['x64', 'arm64'];

const WIN32_ARCHITECTURES: Array<NodeJS.Architecture> = ['x64'];

describe('Architecture', () => {
  test.each(DARWIN_ARCHITECTURES)(
    `should succeed supporting 'darwin' platform '%s' architecture`,
    (architecture) => {
      expect(() =>
        shellCheckArchitecture({ platform: 'darwin', architecture })
      ).not.toThrow();
    }
  );

  test.each(
    ARCHITECTURES.filter(
      (architecture) => !DARWIN_ARCHITECTURES.includes(architecture)
    )
  )(
    `should fail supporting 'darwin' platform '%s' architecture`,
    (architecture) => {
      expect(() =>
        shellCheckArchitecture({ platform: 'darwin', architecture })
      ).toThrow(ArchitectureError);
    }
  );

  test.each(LINUX_ARCHITECTURES)(
    `should succeed supporting 'linux' platform '%s' architecture`,
    (architecture) => {
      expect(() =>
        shellCheckArchitecture({ platform: 'linux', architecture })
      ).not.toThrow();
    }
  );

  test.each(
    ARCHITECTURES.filter(
      (architecture) => !LINUX_ARCHITECTURES.includes(architecture)
    )
  )(
    `should fail supporting 'linux' platform '%s' architecture`,
    (architecture) => {
      expect(() =>
        shellCheckArchitecture({ platform: 'linux', architecture })
      ).toThrow(ArchitectureError);
    }
  );

  test.each(WIN32_ARCHITECTURES)(
    `should succeed supporting 'win32' platform '%s' architecture`,
    (architecture) => {
      expect(() =>
        shellCheckArchitecture({ platform: 'win32', architecture })
      ).not.toThrow();
    }
  );

  test.each(
    ARCHITECTURES.filter(
      (architecture) => !WIN32_ARCHITECTURES.includes(architecture)
    )
  )(
    `should fail supporting 'win32' platform '%s' architecture`,
    (architecture) => {
      expect(() =>
        shellCheckArchitecture({ platform: 'win32', architecture })
      ).toThrow(ArchitectureError);
    }
  );

  test.each(ARCHITECTURES)(
    `should fail supporting 'aix' platform '%s' architecture`,
    (architecture) => {
      expect(() =>
        shellCheckArchitecture({ platform: 'aix', architecture })
      ).toThrow(ArchitectureError);
    }
  );

  test.each(ARCHITECTURES)(
    `should fail supporting 'android' platform '%s' architecture`,
    (architecture) => {
      expect(() =>
        shellCheckArchitecture({ platform: 'android', architecture })
      ).toThrow(ArchitectureError);
    }
  );

  test.each(ARCHITECTURES)(
    `should fail supporting 'cygwin' platform '%s' architecture`,
    (architecture) => {
      expect(() =>
        shellCheckArchitecture({ platform: 'cygwin', architecture })
      ).toThrow(ArchitectureError);
    }
  );

  test.each(ARCHITECTURES)(
    `should fail supporting 'freebsd' platform '%s' architecture`,
    (architecture) => {
      expect(() =>
        shellCheckArchitecture({ platform: 'freebsd', architecture })
      ).toThrow(ArchitectureError);
    }
  );

  test.each(ARCHITECTURES)(
    `should fail supporting 'haiku' platform '%s' architecture`,
    (architecture) => {
      expect(() =>
        shellCheckArchitecture({ platform: 'haiku', architecture })
      ).toThrow(ArchitectureError);
    }
  );

  test.each(ARCHITECTURES)(
    `should fail supporting 'netbsd' platform '%s' architecture`,
    (architecture) => {
      expect(() =>
        shellCheckArchitecture({ platform: 'netbsd', architecture })
      ).toThrow(ArchitectureError);
    }
  );

  test.each(ARCHITECTURES)(
    `should fail supporting 'openbsd' platform '%s' architecture`,
    (architecture) => {
      expect(() =>
        shellCheckArchitecture({ platform: 'openbsd', architecture })
      ).toThrow(ArchitectureError);
    }
  );

  test.each(ARCHITECTURES)(
    `should fail supporting 'sunos' platform '%s' architecture`,
    (architecture) => {
      expect(() =>
        shellCheckArchitecture({ platform: 'sunos', architecture })
      ).toThrow(ArchitectureError);
    }
  );
});
