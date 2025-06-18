import type { Config } from '@jest/types'

const config = {
  // Use ts-jest preset for TypeScript files
  preset: 'ts-jest',

  // Use jsdom environment to simulate a browser DOM for React components
  testEnvironment: 'jsdom',

  // Global settings for ts-jest
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json', // Point to your TypeScript config file
    },
  },

  // Optional: Specify test file patterns if you want to be more specific
  testMatch: ['<rootDir>/src/**/*.test.(ts|tsx)'],

  // Optional: Ignore patterns for test files
  testPathIgnorePatterns: ['/node_modules/'],
}

export default config
