define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/array",
	"dojo/dom",
	"dijit/registry",
	"dijit/_WidgetBase",
	"dijit/_TemplatedMixin",
  "dijit/_WidgetsInTemplateMixin",
  "dojo/text!./templates/EntryPoint.html",
  "dgrid/OnDemandGrid",
  "dojo/store/Memory",
  "dojo/store/JsonRest",
  //temlate dependencies
  "dijit/layout/BorderContainer",
  "dijit/layout/ContentPane",
  "dijit/form/ComboBox",
  "dijit/form/Select"
], function(
	declare,
	lang,
	array,
	dom,
	registry,
	_WidgetBase,
	_TemplatedMixin,
	_WidgetsInTemplateMixin,
	template,
	Grid,
	Memory,
	JsonRest
) {

var EntryPoint = declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
      
      templateString: template,

      postCreate: function() {
      	this.initComponents();
      	this.initConnections();
      },

      startup: function() {
      	this.inherited(arguments);
      },

      initComponents: function() {
      	this.initGrid();
      	var author = this.authorFilter = registry.byId("authorFilter");
      	var title = this.titleFilter = registry.byId("titleFilter");
      	var genre = this.genreFilter = registry.byId("genreFilter");
      	var language = this.languageFilter = registry.byId("languageFilter");

      	// genres
      	var genreStore = new JsonRest({ target: '/api/genres' });
      	genreStore.query().then(function(response) {
      		var options = [];
      		array.forEach(response, function(option) {
      			options.push({
      				label: option["genre"],
      				value: option["id"]
      			});
      		});

	      	genre.set("labelAttr", "genre");
	      	genre.set("sortByLabel", false);
	      	genre.set("disabled", false);  
	      	genre.set("forceWidth", true); 
	      	genre.set("maxHeight", -1); 
	      	genre.addOption(options); 

	      	delete genreStore;	
      	});

      	// languages
      	var languageStore = new JsonRest({ target: '/api/languages' });
      	languageStore.query().then(function(response) {
      		var options = [];
      		array.forEach(response, function(option) {
      			options.push({
      				label: option["language"],
      				value: option["code"]
      			});
      		});
 
      	language.set("labelAttr", "language");
      	language.set("sortByLabel", false);
      	language.set("disabled", false);
	      language.set("forceWidth", true); 
	      language.set("maxHeight", -1);       	
      	language.addOption(options);

      	delete languageStore;
      	});

      	// authors
      	var authorStore = new JsonRest({
      		target: "/api/authors"
      	});
      	author.set("labelAttr", "name");
      	author.set("searchAttr", "search");
      	author.set("autocomplete", true);
      	author.set("disabled", false);
      	author.set("store", authorStore);
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
      },

      initConnections: function() {
      	this.genreFilter.watch("value", lang.hitch(this, "search"));
      	this.languageFilter.watch("value", lang.hitch(this, "search"));
      },

      search: function() {
      	console.log(this._serialize());
      },

      _serialize: function() {
      	var DEFAULT = "DEFAULT";
      	var genre = this.genreFilter.get("value");
      	var language = this.languageFilter.get("value");

      	var form = {};
      	if (genre != DEFAULT) form["genre"] = genre;
      	if (language != DEFAULT) form["language"] = language;

      	return form;
      }
});

return EntryPoint;

});