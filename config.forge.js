const {
  utils: { fromBuildIdentifier },
} = require("@electron-forge/core");

module.exports = {
  name: "Stickies",
  version: "0.0.1",
  buildIdentifier: process.env.IS_BETA ? "beta" : "prod",
  packagerConfig: {
    icon: "/logo.icns",
    appBundleId: fromBuildIdentifier({
      beta: "com.stickies.app",
      prod: "com.stickies.app",
    }),
  },
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        name: "stickies",
      },
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin"],
    },
    {
      name: "@electron-forge/maker-deb",
      config: {},
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {},
    },
  ],
};
