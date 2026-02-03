module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
    moduleFileExtensions: ['js'],
    testMatch: ['**/tests/**/*.test.js'],
    collectCoverageFrom: ['docs/js/**/*.js'],
    transform: {
        '^.+\\.js$': ['babel-jest', { sourceMaps: false }],
    },
};
