import { arrayOfAll } from '../utils';

export const ARCHITECTURES: Array<NodeJS.Architecture> =
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

export const ARCHITECTURES_SUPPORTED: Record<
  NodeJS.Platform,
  Array<NodeJS.Architecture>
> = {
  aix: [],
  android: [],
  cygwin: [],
  darwin: ['x64', 'arm64'],
  freebsd: [],
  haiku: [],
  linux: ['arm64', 'x64'],
  netbsd: [],
  openbsd: [],
  sunos: [],
  win32: ['x64']
};

export const ARCHITECTURES_NOT_SUPPORTED: Record<
  NodeJS.Platform,
  Array<NodeJS.Architecture>
> = Object.fromEntries(
  Object.entries(ARCHITECTURES_SUPPORTED).map(([platform, architectures]) => [
    platform,
    ARCHITECTURES.filter(
      (architecture) => !architectures.includes(architecture)
    )
  ])
) as Record<NodeJS.Platform, Array<NodeJS.Architecture>>;

export const PLATFORMS: Array<NodeJS.Platform> = arrayOfAll<NodeJS.Platform>()([
  'aix',
  'android',
  'darwin',
  'freebsd',
  'haiku',
  'linux',
  'openbsd',
  'sunos',
  'win32',
  'cygwin',
  'netbsd'
]);

export const PLATFORMS_SUPPORTED: Array<NodeJS.Platform> = Object.entries(
  ARCHITECTURES_SUPPORTED
)
  .filter(([, architectures]) => architectures.length > 0)
  .map(([platform]) => platform as NodeJS.Platform);

export const PLATFORMS_NOT_SUPPORTED: Array<NodeJS.Platform> = Object.entries(
  ARCHITECTURES_SUPPORTED
)
  .filter(([, architectures]) => architectures.length <= 0)
  .map(([platform]) => platform as NodeJS.Platform);
