module.exports = {
    webpack: function(config) {
      config.module.rules.push({
        test: /\.md$/,
        use: 'raw-loader',
      })
      return config
    },
    env: {
        siteTitle: 'Next/React Sample App',
    },
    exportTrailingSlash: true,
    exportPathMap: function() {
      return {
        '/': { page: '/' }
      };
    },
    distDir: 'build',
}