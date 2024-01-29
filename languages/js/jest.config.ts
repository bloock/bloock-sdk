import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  globals: {
    'ts-jest': {
      useESM: true,
      tsconfig: 'tsconfig.test.json'
    },
  },
  preset: 'ts-jest',
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  verbose: true,
  testEnvironment: 'node',
};
export default config;
