var C66 = window.C66 || {};

/*
    IMPORTANT!
    Liquid & handlebars DO NOT mix!
    Therefore handlebars templates need to be compiled from separate files.
    template to render the search results, this is configured below namespaced to Handlebars
*/

Handlebars.c66 = window.Handlebars.c66 || {};

Handlebars.c66.config = {
    tmplPath: '/js/tmpl/',
    tmplExtention: '.handlebars'
};

Handlebars.getTemplate = function (name) {
    if (Handlebars.templates === undefined || Handlebars.templates[name] === undefined) {
        $.ajax({
            url: Handlebars.c66.config.tmplPath + name + Handlebars.c66.config.tmplExtention,
            datatype: 'text/javascript',
            success: function (response, status, jqXHR) {
                if (Handlebars.templates === undefined) {
                    Handlebars.templates = {};
                }
                Handlebars.templates[name] = Handlebars.compile(response);
            },
            async: false
        });
    }
    return Handlebars.templates[name];
};

Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

C66.HelpSearch = {
  init: function(json) {
    console.log('Search results json');
    console.log(json);
    var url_string = window.location.href;
    var url = new URL(url_string);
    var q = url.searchParams.get("q");
    
    $('.SearchResults-title').text(q);

    if (json.searchInformation.totalResults == "0") {
        this.renderNoResultsTemplate(q);
    } else {
        this.renderSearchResultsTemplate(json);
        // this.renderSummaryTemplate(json);
    }
  },

  renderNoResultsTemplate() {
      var message = "<p style='padding-top: 3em;font-size: 24px'>Sorry, we couldn't find any search results for <strong>" + q + "</strong></p>" + "<p style='padding-bottom: 6em'>Try another search term or browse through the documentation. If you still can't find what you need. <a href='http://app.cloud66.com/support_tickets/new'>Please get in touch</a></p>";
      
      $("#js_search_results_container").html(message);
  },

  renderSummaryTemplate(json){
      var compiledTemplate = Handlebars.getTemplate("searchSummary");
      var searchSummaryHtml = compiledTemplate(json);
      $("#js_search_title").append(searchSummaryHtml);
  },

  renderSearchResultsTemplate(json) {    
    var compiledTemplate = Handlebars.getTemplate("searchResults");
    var searchResultsHtml = compiledTemplate(json);
    $("#js_search_results_list").html(searchResultsHtml);
  }
};

