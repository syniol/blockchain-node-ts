export default {
    clearMocks: true,
    collectCoverage: false,
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    transform: {
        '^.+\\.ts?$': ['@swc/jest'],
    },
    testMatch: ['**/?(*.)+(spec|test).[t]s?()'],
    verbose: true,
}
