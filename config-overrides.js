const path = require("path");
const webpack = require("webpack");

module.exports = function override(config, env) {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    assert: require.resolve("assert"),
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    os: require.resolve("os-browserify"),
    url: require.resolve("url"),
    path: require.resolve("path-browserify"),
    fs: require.resolve("browserify-fs"),
  });
  config.resolve.fallback = fallback;
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ]);
  config.resolve = {
    ...config.resolve,
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@videos": path.resolve(__dirname, "src/assets/videos"),
      "@images": path.resolve(__dirname, "src/assets/images"),
      "@svg": path.resolve(__dirname, "src/assets/svg"),
      "@data-access": path.resolve(__dirname, "src/data-access"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@redux": path.resolve(__dirname, "src/redux"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@constants": path.resolve(__dirname, "src/constants"),
      "@layouts": path.resolve(__dirname, "src/layouts"),
      "@pdf": path.resolve(__dirname, "src/assets/pdf"),
      "@hook": path.resolve(__dirname, "src/hook"),
    },
  };
  config.ignoreWarnings = [/Failed to parse source map/];
  return config;
};
