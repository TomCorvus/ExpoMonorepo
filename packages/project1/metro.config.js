const { getDefaultConfig } = require("@react-native/metro-config");
const MetroSymlinksResolver = require("@rnx-kit/metro-resolver-symlinks");
const { makeMetroConfig } = require("@rnx-kit/metro-config");
const { TypeScriptPlugin } = require("@rnx-kit/metro-plugin-typescript");

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */

const path = require("path");

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "../..");

const defaultConfig = getDefaultConfig(__dirname);

module.exports = makeMetroConfig({
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    assetExts: [...defaultConfig.resolver.assetExts, "lottie"],
    disableHierarchicalLookup: true,
    nodeModulesPaths: [
      path.resolve(projectRoot, "node_modules"),
      path.resolve(workspaceRoot, "node_modules"),
    ],
    resolverMainFields: ["sbmodern", "react-native", "browser", "main"],
    resolveRequest: MetroSymlinksResolver({
      remapModule: (_context, moduleName) => {
        return moduleName;
      },
    }),
  },
  serializer: {
    experimentalSerializerHook: TypeScriptPlugin(),
  },
  watchFolders: [workspaceRoot],
});
