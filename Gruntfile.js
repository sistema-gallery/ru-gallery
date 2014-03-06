'use strict';

module.exports = function (grunt) {

    require('time-grunt')(grunt)

    grunt.initConfig({

        config: {
            src: 'src',
            dist: 'dist',
            bower: 'bower_components'
        },

        watch: {
            assemble: {
                files: [
                    '<%= config.src %>/{content,data,templates}/{,*/}*.{md,hbs,yml}'
                ],
                tasks: ['assemble']
            },
            assets: {
                files: [
                    '<%= config.src %>/assets/{,*/}*.css'
                ],
                tasks: ['copy:assets']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                      '<%= config.dist %>/{,*/}*.html',
                      '<%= config.dist %>/assets/{,*/}*.css',
                      '<%= config.dist %>/assets/{,*/}*.js',
                      '<%= config.dist %>/assets/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },

        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '<%= config.dist %>'
                    ]
                }
            }
        },

        assemble: {
            options: {
                assets: '<%= config.dist %>/assets',
                layoutdir: '<%= config.src %>/templates/layouts',
                layout: '<%= assemble.options.layourdir %>/default.hbs',
                data: '<%= config.src %>/data/*.{json,yml}',
                partials: '<%= config.src %>/templates/partials/*.hbs',
                plugins: [
                    'assemble-contrib-permalinks',
                    'assemble-contrib-sitemap'
                ],

                helpers: [
                    '<%= config.src %>/templates/helpers/**/*.js'
                ],

                destPref: '<%= config.dist %>'
            },

            pages: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.src %>/templates/pages',
                        src: '*.hbs',
                        dest: '<%= config.dist %>'
                    }
                ]
            },

            content: {
                options: {
                    layout: '<%= assemble.options.layourdir %>/default-md.hbs',
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.src %>/content',
                        src: '**/*.md',
                        dest: '<%= config.dist %>'
                    }
                ]
            }
        },

        clean: [
            '<%= config.dist %>/assets/**',
            '<%= config.dist %>/**/*.{html,xml}'
        ],

        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.bower %>/bootstrap/dist',
                        src: '**',
                        dest: '<%= config.dist %>/assets/bootstrap'
                    },
                    {
                        expand: true,
                        cwd: '<%= config.bower %>/jquery/dist',
                        src: '**',
                        dest: '<%= config.dist %>/assets/jquery'
                    }
                ]
            },
            assets: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.src %>/assets',
                        src: ['**', '!robots.txt', '!favicon.ico'],
                        dest: '<%= config.dist %>/assets'
                    },
                    {
                        expand: true,
                        cwd: '<%= config.src %>/content',
                        src: '**/*.{png,jpg,jpeg,pdf}',
                        dest: '<%= config.dist %>'
                    },
                    {
                        expand: true,
                        cwd: '<%= config.src %>/assets',
                        src: '{robots.txt,favicon.ico}',
                        dest: '<%= config.dist %>/'
                    }
                ]
            },
            github: {
                src: '{.nojekyll,CNAME}',
                dest: '<%= config.dist %>/'
            }
        }
    })

    grunt.loadNpmTasks('assemble')
    grunt.loadNpmTasks('grunt-contrib-clean')
    grunt.loadNpmTasks('grunt-contrib-copy')
    grunt.loadNpmTasks('grunt-contrib-connect')
    grunt.loadNpmTasks('grunt-contrib-watch')

    grunt.registerTask('server', [
        'clean',
        'copy',
        'assemble',
        'connect:livereload',
        'watch'
    ])

    grunt.registerTask('build', [
        'clean',
        'copy',
        'assemble'
    ])

    grunt.registerTask('default', [
        'build'
    ])
}
