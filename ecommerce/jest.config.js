/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    globals: {
        'ts-jest': {
            tsConfigFile: 'tsconfig.json',
        },
        TextEncoder: require('util').TextEncoder,
        TextDecoder: require('util').TextDecoder,
    },
    moduleNameMapper: {
        '^.+\\.(css|scss|less)$': '<rootDir>/forscss.stub.js',
    },
};
