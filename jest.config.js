/* eslint-disable import/no-anonymous-default-export */
module.exports = {
  testEnvironment: "jsdom",
  roots: ["<rootDir>/src"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  transform: {
    "^.+\\.tsx$": "ts-jest",
    "^.+\\.ts$": "ts-jest",
  },
  testRegex: "(/.*.(test|spec)).(jsx?|tsx?)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  // collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/src/**/*.{ts,tsx}"],
  coverageDirectory: "<rootDir>/coverage/",
  coveragePathIgnorePatterns: [
    "(tests/.*.mock).(jsx?|tsx?)$",
    "(.*).d.ts$",
    "<rootDir>/src/main.tsx",
  ],
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|svg)$":
      "identity-obj-proxy",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  verbose: true,
  testTimeout: 30000,
};
