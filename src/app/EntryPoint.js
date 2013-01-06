define([
	"dojo/_base/declare",
	"dojo/dom",
	"dijit/_WidgetBase",
	"dijit/_TemplatedMixin",
  "dijit/_WidgetsInTemplateMixin",
  "dojo/text!./templates/EntryPoint.html",
  "dgrid/OnDemandGrid",
  "dojo/store/JsonRest",
  //temlate dependencies
  "dijit/layout/BorderContainer",
  "dijit/layout/ContentPane"
], function(
	declare,
	dom,
	_WidgetBase,
	_TemplatedMixin,
	_WidgetsInTemplateMixin,
	template,
	Grid,
	JsonRest
) {

var EntryPoint = declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
      
      templateString: template,

      postCreate: function() {
      	//this.inherited(arguments);
      	this.initGrid();
      },

      startup: function() {
      	this.inherited(arguments);
      },

      initGrid: function() {
      	var store = new JsonRest({ target: "/api/books" });
      	var grid = new Grid({
      		store: store,
          columns: {
	          title: "Nazev",
	          author: "Autor",
	          language: "Jazyk",
	          genre: "Zanr",
	          price: "Cena"
		      },

		      minRowsPerPage: 100,
		      maxRowsPerPage: 200,
		      farOffRemoval: 1000,
		      pagingDelay: 80,

					loadingMessage: 'Loading data...',
					noDataMessage: 'No data found'

      	}, this.gridNode);

      	grid.refresh();
      }
});

return EntryPoint;

});