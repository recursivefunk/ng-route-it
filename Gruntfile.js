

module.exports = function(grunt) {

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