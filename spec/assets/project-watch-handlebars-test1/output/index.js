"use strict";
exports.__esModule = true;
var templates_1 = require("./templates/templates");
var handlebars_1 = require("handlebars");
var _templates = {};
function getTemplate(name) {
    if (!_templates[name]) {
        _templates[name] = handlebars_1.template(eval('(' + templates_1.templates[name] + ')'));
        // console.log('seba', _templates[name])
    }
    return _templates[name];
}
var header = getTemplate('header');
// console.log(header)
console.log(header({ title: 'seba is the best' }));
