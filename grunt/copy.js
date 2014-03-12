'use strict';

module.exports = {
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
