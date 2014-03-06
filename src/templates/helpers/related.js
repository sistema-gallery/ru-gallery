'use strict';

module.exports.register = function (Handlebars, config)  {

    var containsCategory = function (contextPage, categoryPage) {
        var contextCategories = contextPage.data.categories || []
        var categoryCategories = categoryPage.data.categories || []
        return contextCategories.some(function (contentCategory) {
            return categoryCategories.some(function (categoryCategory) {
                return contentCategory === categoryCategory
            })
        })
    }

    var findRelated = function (context) {
        var relatedPages = {}
        var relatedPagesKeys = function () {
            return Object.getOwnPropertyNames(relatedPages)
        }

        if (!context || !config.categories) return ''

        config.categories.forEach(function (category) {
            category.pages.forEach(function (categoryPage) {
                var isTarget = containsCategory(context, categoryPage)
                if (isTarget && !(categoryPage.dest in relatedPages)) {
                    relatedPages[categoryPage.dest] = categoryPage
                }
            })
        })

        return relatedPagesKeys().map(function (pagePath) {
            return relatedPages[pagePath]
        })
    }

    var setRelatives = function (context, relatedPages) {
        context.relatedPages = relatedPages
        context.hasRelatives = relatedPages.length > 1 // minus self
    }

    Handlebars.registerHelper('checkRelatives', function (context)  {
        var relatedPages = findRelated(context)
        setRelatives(context, relatedPages)
    })

    Handlebars.registerHelper('related', function (context, options) {
        var relatedPages = context.relatedPages
        var markup = ''

        if (!context.hasRelatives) {
            relatedPages = findRelated(context)
            setRelatives(context, relatedPages)
        }

        relatedPages = relatedPages.sort(function (a, b) {
            if (a.data.title > b.data.title) return 1
            if (a.data.title < b.data.title) return -1
            return 0
        })

        relatedPages.forEach(function (relatedPage) {
            markup += options.fn(relatedPage)
        })

        return markup
    })
}
