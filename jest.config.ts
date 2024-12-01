import type { Config } from 'jest'

const config: Config = {
    verbose: true,
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '\\.svg$': '<rootDir>/__mocks__/svgMock.ts',
    },
    transform: {
        '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
    },
    testEnvironment: 'jsdom',
}

export default config
