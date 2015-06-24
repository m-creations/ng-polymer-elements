/**
@toc
2. load grunt plugins
3. init
4. setup variables
5. grunt.initConfig
6. register grunt tasks

*/

'use strict';

module.exports = function(grunt) {

  /**
  Load grunt plugins
  @toc 2.
  */
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks("grunt-jsbeautifier");
  grunt.loadNpmTasks('grunt-githooks');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-npm-install');

  /**
  Function that wraps everything to allow dynamically setting/changing grunt options and config later by grunt task. This init function is called once immediately (for using the default grunt options, config, and setup) and then may be called again AFTER updating grunt (command line) options.
  @toc 3.
  @method init
  */
  function init(params) {
    /**
    Project configuration.
    @toc 5.
    */
    grunt.initConfig({
      githooks: {
        all: {
          options: {
            // template: 'path/to/a/template'
          },
          // Will bind the jshint and test:unit tasks
          // with the template specified above
          'pre-commit': 'jshint jsbeautifier:git-pre-commit',

          // Will bind the bower:install task
          // with a specific template
          'post-merge': {
            taskNames: 'npm-install bower:install',
          },
          'post-rewrite': {
            taskNames: 'npm-install bower:install',
          }
        }
      },
      bower: {
        install: {
          //just run 'grunt bower:install' and find the bower deps in targetDir
          // options: {
          //   targetDir: "./bower_components"
          // }
          options: {
            targetDir: './lib',
            layout: 'byType',
            install: true,
            verbose: false,
            cleanTargetDir: false,
            cleanBowerDir: false,
            bowerOptions: {}
          }
        }
      },
      jshint: {
        files: ["package.json", "bower.json", "*.js", "!Gruntfile.js", "!*.min.js"],
        options: {
          //force:          true,
          globalstrict: true,
          //sub:            true,
          node: true,
          loopfunc: true,
          browser: true,
          devel: true,
          jshintrc: true,
          globals: {
            angular: false,
            $: false,
            moment: false,
            Pikaday: false,
            module: false,
            forge: false
          }
        }
      },
      uglify: {
        options: {
          mangle: false
        },
        build: {
          files: {},
          src: 'ng-polymer-elements.js',
          dest: 'ng-polymer-elements.min.js'
        }
      },
      jsbeautifier: {
        default: {
          src: ["<%= jshint.files %>", "Gruntfile.js"]
        },
        "git-pre-commit": {
          src: ["<%= jshint.files %>"],
          options: {
            mode: "VERIFY_ONLY"
          }
        },
        options: {
          html: {
            braceStyle: "collapse",
            indentChar: " ",
            indentScripts: "keep",
            indentSize: 2,
            maxPreserveNewlines: 10,
            preserveNewlines: true,
            unformatted: ["a", "sub", "sup", "b", "i", "u"],
            wrapLineLength: 0
          },
          css: {
            indentChar: " ",
            indentSize: 2
          },
          js: {
            braceStyle: "collapse",
            breakChainedMethods: false,
            e4x: false,
            evalCode: false,
            indentChar: " ",
            indentLevel: 0,
            indentSize: 2,
            indentWithTabs: false,
            jslintHappy: false,
            keepArrayIndentation: false,
            keepFunctionIndentation: false,
                                                 maxPreserveNewlines: 10,                         
            preserveNewlines: true,
            spaceBeforeConditional: true,
            spaceInParen: false,
            unescapeStrings: false,
            wrapLineLength: 0,
            endWithNewline: true
          }
        }
      }
    });


    /**
    register/define grunt tasks
    @toc 6.
    */
    // Default task(s).
    grunt.registerTask('init', ['githooks', 'bower:install']);
    // grunt.registerTask('default', ['jshint:beforeconcat', 'less:development', 'concat:devJs', 'concat:devCss']);
    grunt.registerTask('default', ['uglify:build']);

  }
  init({}); //initialize here for defaults (init may be called again later within a task)

};
