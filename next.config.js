module.exports = {
    webpack: function(config) {
      config.module.rules.push({
        test: /\.md$/,
        use: 'raw-loader',
      })
      return config
    },
    env: {
        siteTitle: 'A Sample Next/React Game',
    },
    exportTrailingSlash: true,
    exportPathMap: function() {
      return {
        '/': { page: '/' }
      };
    }
}