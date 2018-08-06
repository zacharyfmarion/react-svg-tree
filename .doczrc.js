export default {
  typescript: true,
  port: 9001,
  modifyBundlerConfig: (config, dev, args) => {
    config.module.rules.push({
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    });
    return config;
  },
};
