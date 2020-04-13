const {pathsToModuleNameMapper} = require('ts-jest/utils');
const {compilerOptions} = require('./tsconfig');

module.exports = {
    preset: 'ts-jest',
    roots: ['<rootDir>/src/'],
    testMatch: ['**/+(*.)+(spec).+(ts)'],
    setupFilesAfterEnv: ['<rootDir>/src/test.ts'],
    collectCoverage: true,
    coverageReporters: ['html'],
    coverageDirectory: 'coverage/my-app',
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
        prefix: '<rootDir>/'
    })
};
