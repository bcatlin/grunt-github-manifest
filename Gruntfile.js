module.exports = function(grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        mochaTest:{
            options: {
                reporter: 'spec'
            },
            tests:{
                src: ['tests/create-manifest-tests.js']
            }
        },
        "create-manifest": {
            test: {
                options: {
                    commitHistoryStartDate: {
                        url: "http://localhost:8888/deployment-info",
                        path: "$.lastModifiedOn"
                    },
                    manifestPath: "tests/data/commit_history.json",
                    github: {
                        user: "opentable",
                        repo: "grunt-github-manifest"
                    }
                }
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.registerTask('test', ['jshint', 'start-date-server', 'clean-manifest', 'create-manifest:test', 'mochaTest']);
    grunt.registerTask('local_test', ['jshint', 'create-manifest:test']);
    grunt.registerTask('default', ['test']);
    grunt.loadTasks('tasks');
    grunt.loadTasks('tests/tasks');


    grunt.registerTask('clean-manifest', 'Deletes the manifest created by the test', function() {
        var fs = require('fs');
        try {
            fs.unlinkSync('tests/data/commit_history.json');
        }
        catch (err) {}
    });
};
