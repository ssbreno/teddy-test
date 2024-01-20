module.exports = {
  testEnvironment: "jest-environment-node",
  verbose: true,
  rootDir: ".",
  testMatch: ["<rootDir>/**/*.spec.ts"],
  moduleFileExtensions: ["js", "json", "ts"],
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  collectCoverageFrom: ["<rootDir>/src/**/*.(t|j)s"],
  coverageDirectory: "<rootDir>/coverage",
};
