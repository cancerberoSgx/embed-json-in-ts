export interface templates_definition {
	header: string;
}
export var templates:templates_definition = {"header":"{\"compiler\":[7,\">= 4.0.0\"],\"main\":function(container,depth0,helpers,partials,data) {\n    var helper;\n\n  return \"<h1>\"\n    + container.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === \"function\" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{\"name\":\"title\",\"hash\":{},\"data\":data}) : helper)))\n    + \"</h1>\\n<p>hey mister</p>  \";\n},\"useData\":true}"};
