import type { Config } from 'jest'

const config: Config = {
    verbose: true,
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    transform: {
        '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
        '^.+\\.svg$': '<rootDir>/svgTransform.js',
    },
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
}

export default config
