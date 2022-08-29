import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
    extensionsToTreatAsEsm: ['.ts'],
    globals: {
        'ts-jest': {
            useESM: true,
        },
    },
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    verbose: true,
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        "^.+\\.[t|j]sx?$": "ts-jest",
    },
};
export default config;
