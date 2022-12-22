import { pathsToModuleNameMapper, JestConfigWithTsJest } from 'ts-jest';
import tsconfig from './tsconfig.json';

export default <JestConfigWithTsJest>{
  preset: 'ts-jest',
  verbose: false,
  rootDir: './',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  globalSetup: '<rootDir>/tests/jest.setup.ts',
  testEnvironment: 'node',
  collectCoverage: false,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/src/**/*.d.ts'],
  moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths),
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: './tests/tsconfig.json' }]
  }
};
