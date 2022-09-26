import type {Config} from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  extensionsToTreatAsEsm: ['.ts'],
  globals: {
    'ts-jest': {
      useESM: true,
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
