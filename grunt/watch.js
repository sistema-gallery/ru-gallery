'use strict';

module.exports = {
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
}
