System.register("templates/templates", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var templates;
    return {
        setters: [],
        execute: function () {
            exports_1("templates", templates = { "header": "{\"compiler\":[7,\">= 4.0.0\"],\"main\":function(container,depth0,helpers,partials,data) {\n    var helper;\n\n  return \"<h1>\"\n    + container.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === \"function\" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{\"name\":\"title\",\"hash\":{},\"data\":data}) : helper)))\n    + \"</h1>\\n<p>hey mister</p>  \";\n},\"useData\":true}" });
        }
    };
});
System.register("index", ["templates/templates", "handlebars"], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    function getTemplate(name) {
        if (!_templates[name]) {
            _templates[name] = handlebars_1.template(eval('(' + templates_1.templates[name] + ')'));
            // console.log('seba', _templates[name])
        }
        return _templates[name];
    }
    var templates_1, handlebars_1, _templates, header;
    return {
        setters: [
            function (templates_1_1) {
                templates_1 = templates_1_1;
            },
            function (handlebars_1_1) {
                handlebars_1 = handlebars_1_1;
            }
        ],
        execute: function () {
            _templates = {};
            header = getTemplate('header');
            // console.log(header)
            console.log(header({ title: 'seba is the best' }));
        }
    };
});
