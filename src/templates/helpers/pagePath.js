'use strict';

module.exports.register = function (Handlebars, config)  {

    Handlebars.registerHelper('pagePath', function (context)  {
        if (!config.destPref) return
        return  context.dest.substring(config.destPref.length)
    })
}
