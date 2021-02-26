module.exports = {
    "roots": [
        "<rootDir>/routes"
    ],
    "testMatch": [
        "**/__tests__/**/*.+(ts|tsx|js)",
        "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    "moduleNameMapper": {
        "\\.(css|less|scss)$": "identity-obj-proxy"
    }
}