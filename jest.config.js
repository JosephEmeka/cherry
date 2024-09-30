module.exports = {
    testEnvironment: "node",
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
    },
    // extensionsToTreatAsEsm: [".js"],
    moduleNameMapper: {

    },
    transformIgnorePatterns: [
        "<rootDir>/node_modules/(?!(your-module-name|another-module-name)/)",
    ],
};