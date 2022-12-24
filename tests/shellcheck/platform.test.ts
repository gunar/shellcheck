import { shellCheckPlatform } from '~/utils';
import { PlatformError } from '~/errors';

describe('Platform', () => {
  it(`should succeed supporting 'darwin' platform`, () => {
    expect(() => shellCheckPlatform({ platform: 'darwin' })).not.toThrow();
  });

  it(`should succeed supporting 'linux' platform`, () => {
    expect(() => shellCheckPlatform({ platform: 'linux' })).not.toThrow();
  });

  it(`should succeed supporting 'win32' platform`, () => {
    expect(() => shellCheckPlatform({ platform: 'win32' })).not.toThrow();
  });

  it(`should fail supporting 'aix' platform`, () => {
    expect(() => shellCheckPlatform({ platform: 'aix' })).toThrow(
      PlatformError
    );
  });

  it(`should fail supporting 'android' platform`, () => {
    expect(() => shellCheckPlatform({ platform: 'android' })).toThrow(
      PlatformError
    );
  });

  it(`should fail supporting 'cygwin' platform`, () => {
    expect(() => shellCheckPlatform({ platform: 'cygwin' })).toThrow(
      PlatformError
    );
  });

  it(`should fail supporting 'freebsd' platform`, () => {
    expect(() => shellCheckPlatform({ platform: 'freebsd' })).toThrow(
      PlatformError
    );
  });

  it(`should fail supporting 'haiku' platform`, () => {
    expect(() => shellCheckPlatform({ platform: 'haiku' })).toThrow(
      PlatformError
    );
  });

  it(`should fail supporting 'netbsd' platform`, () => {
    expect(() => shellCheckPlatform({ platform: 'netbsd' })).toThrow(
      PlatformError
    );
  });

  it(`should fail supporting 'openbsd' platform`, () => {
    expect(() => shellCheckPlatform({ platform: 'openbsd' })).toThrow(
      PlatformError
    );
  });

  it(`should fail supporting 'sunos' platform`, () => {
    expect(() => shellCheckPlatform({ platform: 'sunos' })).toThrow(
      PlatformError
    );
  });
});
