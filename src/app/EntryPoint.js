define([
	"dojo/_base/declare",
	"dijit/_WidgetBase",
	"dijit/_TemplatedMixin",
  "dijit/_WidgetsInTemplateMixin",
  "dojo/text!./templates/EntryPoint.html",
  //temlate dependencies
  "dijit/layout/BorderContainer",
  "dijit/layout/ContentPane"
], function(
	declare,
	_WidgetBase,
	_TemplatedMixin,
	_WidgetsInTemplateMixin,
	template
) {

var EntryPoint = declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
      
      templateString: template
});

return EntryPoint;

});