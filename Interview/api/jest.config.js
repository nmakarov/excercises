module.exports = {
    rootDir: "./server",
    collectCoverage: true,
    coverageDirectory: '<rootDir>/../serverCoverage',
    coverageThreshold: {
        global: {
            branches: 30,
            functions: 30,
            lines: 30,
            statements: 30
        }
    },
    testMatch: ["**/*.test.js"],
};
  