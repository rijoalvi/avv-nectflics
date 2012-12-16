var Movie = Backbone.Model.extend({
// Default attributes
  defaults: {
    id: 0,
    original_title: "undefined",
    author: "undefined",
    release_date: "undefined",
    poster_path: "undefined",
    overview: "undefined"
  },
  parse: function (response) {
    var poster_path = "<img src=\"http://cf2.imgobject.com/t/p/w92" + response.poster_path + "\"/>";
    return {
      id: response.id,
      original_title: response.original_title,
      answer: response.answer,
      release_date: response.release_date,
      poster_path: poster_path
    };
  }
});

var MoviesByGenre = Backbone.Collection.extend({
  model: Movie,
  query: "28",
  url: function () {
    return "http://api.themoviedb.org/3/genre/" + this.query + "/movies?api_key=d0685fdb19e4c0aa2fbc292873dc2cc0";
  },
  parse: function (response) {
    return response.results;
  },
  initialize: function (q) {
    if (q) {
      this.query = q;
    }
  }
});

var ComedyMoviesView = Backbone.View.extend({
  el: "#comedyCarousel",
  tpl: _.template($("#comedyTemplate").html()),
  events: {
    "click #searchComedy": "listLoad",
    "touchend #comedyList li": "loadMovie"
  },
  render: function () {
    this.$el.find('ul').html(this.tpl({movies: [{text: "click !!!"}]}));
    var self = this;
      $(window).on('load', function() { self.listLoad() });
      return this;    
  },
  loadMovie: function(e){
    alert("Comedy!\n"+e.currentTarget.id);
    $(".contentWrapper").animate({"left": -($('#descriptionPage').position().left)}, 600);
  },
  listLoad: function (e) {
    //e.preventDefault();
    var movies = new MoviesByGenre(35);
    var $el = this.$el;
    var template = this.tpl;
    movies.fetch({
      success: function (collection, response, options) {
        $el.find('ul').fadeOut(400, function () {
          $(this).html(template({movies: collection.toJSON()})).fadeIn(400);
          $("#comedyList").jcarousel();
        });
      },
      error: function (collection, xhr, options) {
        console.log("Error: ", xhr);
      }
    });
  }
});

var ActionMoviesView = Backbone.View.extend({
  el: "#actionCarousel",
  tpl: _.template($("#actionTemplate").html()),
  events: {
    "click #searchAction": "listLoad",
    "touchend #actionList li": "loadMovie",
    "touchmove #actionList li": "doNothing"
  },
  render: function () {
    this.$el.find('ul').html(this.tpl({movies: [{text: "click !!!"}]}));
    var self = this;
      $(window).on('load', function() { self.listLoad() });
      return this;    
  },
  loadMovie: function(e){
    alert("Action!\n"+e.currentTarget.id);
    $(".contentWrapper").animate({"left": -($('#descriptionPage').position().left)}, 600);
  },
  doNothing: function(e){
    //do nothing
  },
  listLoad: function (e) {
    //e.preventDefault();
    var movies = new MoviesByGenre(28);
    var $el = this.$el;
    var template = this.tpl;
    movies.fetch({
      success: function (collection, response, options) {
        $el.find('ul').fadeOut(400, function () {
          $(this).html(template({movies: collection.toJSON()})).fadeIn(400);
          $("#actionList").jcarousel();
        });
      },
      error: function (collection, xhr, options) {
        console.log("Error: ", xhr);
      }
    });
  }
});

var FictionMoviesView = Backbone.View.extend({
  el: "#fictionCarousel",
  tpl: _.template($("#fictionTemplate").html()),
  events: {
    "click #searchFiction": "listLoad",
    "touchend #fictionList li": "loadMovie"
  },
  render: function () {
    this.$el.find('ul').html(this.tpl({movies: [{text: "click !!!"}]}));
    var self = this;
      $(window).on('load', function() { self.listLoad() });
      return this;    
  },
  loadMovie: function(e){
    alert("Fiction!\n"+e.currentTarget.id);
    $(".contentWrapper").animate({"left": -($('#descriptionPage').position().left)}, 600);
  },
  listLoad: function (e) {
    //e.preventDefault();
    var movies = new MoviesByGenre(878);
    var $el = this.$el;
    var template = this.tpl;
    movies.fetch({
      success: function (collection, response, options) {
        $el.find('ul').fadeOut(400, function () {
          $(this).html(template({movies: collection.toJSON()})).fadeIn(400);
          $("#fictionList").jcarousel();
        });
      },
      error: function (collection, xhr, options) {
        console.log("Error: ", xhr);
      }
    });
  }
});

var WesternMoviesView = Backbone.View.extend({
  el: "#westernCarousel",
  tpl: _.template($("#westernTemplate").html()),
  events: {
    "click #searchWestern": "listLoad",
    "touchend #westernList li": "loadMovie"
  },
  render: function () {
    this.$el.find('ul').html(this.tpl({movies: [{text: "click !!!"}]}));
    var self = this;
      $(window).on('load', function() { self.listLoad() });
      return this;    
  },
  loadMovie: function(e){
    alert("Western!\n"+e.currentTarget.id);
    $(".contentWrapper").animate({"left": -($('#descriptionPage').position().left)}, 600);
  },
  listLoad: function (e) {
    //e.preventDefault();
    var movies = new MoviesByGenre(37);
    var $el = this.$el;
    var template = this.tpl;
    movies.fetch({
      success: function (collection, response, options) {
        $el.find('ul').fadeOut(400, function () {
          $(this).html(template({movies: collection.toJSON()})).fadeIn(400);
          $("#westernList").jcarousel();
        });
      },
      error: function (collection, xhr, options) {
        console.log("Error: ", xhr);
      }
    });
  }
});

var SuspenseMoviesView = Backbone.View.extend({
  el: "#suspenseCarousel",
  tpl: _.template($("#suspenseTemplate").html()),
  events: {
    "click #searchSuspense": "listLoad",
    "touchend #suspenseList li": "loadMovie"
  },
  render: function () {
    this.$el.find('ul').html(this.tpl({movies: [{text: "click !!!"}]}));
    var self = this;
      $(window).on('load', function() { self.listLoad() });
      return this;    
  },
  loadMovie: function(e){
    alert("Suspense!\n"+e.currentTarget.id);
    $(".contentWrapper").animate({"left": -($('#descriptionPage').position().left)}, 600);
  },
  listLoad: function (e) {
    //e.preventDefault();
    var movies = new MoviesByGenre(10748);
    var $el = this.$el;
    var template = this.tpl;
    movies.fetch({
      success: function (collection, response, options) {
        $el.find('ul').fadeOut(400, function () {
          $(this).html(template({movies: collection.toJSON()})).fadeIn(400);
          $("#suspenseList").jcarousel();
        });
      },
      error: function (collection, xhr, options) {
        console.log("Error: ", xhr);
      }
    });
  }
});

var Router = Backbone.Router.extend({
  routes: {
    "listLoad/:query": "listLoad"  // #listLoad/kiwis
  },
  listLoad: function (query) {
    alert(query);
  }
});

$(function () {
  new ComedyMoviesView().render();
  new ActionMoviesView().render();
  new SuspenseMoviesView().render();
  new FictionMoviesView().render();
  new WesternMoviesView().render();
  new Router();
  Backbone.history.start();
});
