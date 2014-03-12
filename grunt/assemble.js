'use strict';

module.exports = {
    options: {
        assets: '<%= config.dist %>/assets',
        layoutdir: '<%= config.src %>/templates/layouts',
        layout: '<%= assemble.options.layourdir %>/default.hbs',
        data: '<%= config.src %>/data/*.{json,yml}',
        partials: '<%= config.src %>/templates/partials/*.hbs',
        helpers: [
            '<%= config.src %>/templates/helpers/**/*.js'
        ],

        destPref: '<%= config.dist %>',
        googleAnalytics: 'UA-34724857-1'
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
            disqusName: 'sistema-gallery',
            layout: '<%= assemble.options.layourdir %>/default-md.hbs'
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
}
