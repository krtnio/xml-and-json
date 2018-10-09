module.exports = function (config) {
  config.set({
    // basePath: '../..',
    frameworks: ['mocha'],

    files: [
      // './xml2json.js',
      // './tests/**/*.js'
      { pattern: 'tests/*.test.js', watched: false }
    ],

    preprocessors: {
      'tests/*.test.js': ['webpack']
    },

    webpack: {},

    webpackMiddleware: {
      stats: 'errors-only'
    },

    client: {
      mocha: {
        // change Karma's debug.html to the mocha web reporter
        reporter: 'html',

        // require specific files after Mocha is initialized
        // require: [require.resolve('bdd-lazy-var/bdd_lazy_var_global')],

        // custom ui, defined in required file above
        // ui: 'bdd-lazy-var/global',
      }
    }
  })
}
