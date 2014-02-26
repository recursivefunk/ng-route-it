

module.exports = function(grunt) {

  'use strict';

  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.initConfig({
    mochaTest: {
      test: {
        src: ['test/test.js']
      }
    }
  });

  grunt.registerTask('default', 'mochaTest');

};