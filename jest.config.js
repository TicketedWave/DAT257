module.exports = {
  roots: ['<rootDir>/dat257/app'],
  modulePathIgnorePatterns: ['<rootDir>/dat257/package.json'],
  testMatch: ['**/?(*.)+(test).[jt]s?(x)'],
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.(js|jsx|mjs|cjs|ts|tsx)$': 'babel-jest',  // Ensure babel-jest transforms JS/JSX files
  },
};
