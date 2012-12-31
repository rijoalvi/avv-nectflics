/*
 * Model used to show movies by genere and search results
 * Different from the specific model for movie details since they use different WS
 *
 */
var CarouselMovie = Backbone.Model.extend({
        // Default attributes
        defaults: {
            id: 0,
            original_title: "undefined",
            release_date: "undefined",
            poster_path: "undefined",
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

/*
 * Model used to show details from a movie.
 * It is not used as part of a collection
 *
 */
var DetailsMovie = Backbone.Model.extend({
        // Default attributes
        defaults: {
            id: "0",
            original_title: "undefined",
            release_date: "undefined",
            poster_path: "undefined",
            overview: "undefined",
            homepage: "undefined",
        },
        initialize: function (q) {
            if (q.id) {
                this.id = q.id;
            }
        },
        url: function () {
            return "http://api.themoviedb.org/3/movie/" + this.id + "?api_key=d0685fdb19e4c0aa2fbc292873dc2cc0";
        },
        parse: function (response) {
            var poster_path = "<img src=\"http://cf2.imgobject.com/t/p/w185" + response.poster_path + "\"/>";
            return {
                id: response.id,
                original_title: response.original_title,
                answer: response.answer,
                release_date: response.release_date,
                poster_path: poster_path,
                overview: response.overview
            };
        }
    });

/*
 * Collection of movies by search criteria (person/title)
 * It's in charge of the search movies WS Call
 *
 */
var MoviesBySearch = Backbone.Collection.extend({
        model: CarouselMovie,
        type: "movie",   //movie or person
        query: "28",
        url: function () {
            return "http://api.themoviedb.org/3/search/"+this.type+"?api_key=d0685fdb19e4c0aa2fbc292873dc2cc0&query="+this.query;
        },
        parse: function (response) {
            return response.results;
        },
        initialize: function () {

        },
        setCriteria: function (criteria, q) {
            if (criteria) {
                //this.type = criteria;
            }
            if (q) {
                this.query = q;
            }
        }
    });

 /*
 * Collection of movies by genere
 * It's in charge of the WS Call for movies by genere
 *
 */
var MoviesByGenre = Backbone.Collection.extend({
        model: CarouselMovie,
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


/*
 * Views for each genere. 
 * Different from the specific model for movie details since they use different WS
 * Functions: 
 * loadMovie: loads the selected movie information in a detailed view
 * listLoad: loads the movie posters for the specific genere
 *
 */
var ComedyMoviesView = Backbone.View.extend({
        el: "#comedyCarousel",
        tpl: _.template($("#comedyTemplate").html()),
        events: {
            "click #searchComedy": "listLoad",
            "touchend #comedyList li": "loadMovie"
        },
        render: function () {
            var self = this;
            $(window).on('load', function () { self.listLoad(); });
            return this;
        },
        loadMovie: function (e) {
            detailsView.viewLoad(e.currentTarget.id);
            $(".contentWrapper").animate({"left": -($('#descriptionPage').position().left)}, 600);
            $("#backGenresArrow").show();
            $('html, body').animate({scrollTop: 0}, 600);
        },
        listLoad: function () {
            var movies = new MoviesByGenre(35); //loads a collection of comedy movies. number 35 refers to the code on tmdb for comedy.
            var $el = this.$el;
            var template = this.tpl;
            movies.fetch({ // calls the ws and display the posters on the screen.
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
            var self = this;
            $(window).on('load', function () { self.listLoad(); });
            return this;
        },
        loadMovie: function (e) {
            detailsView.viewLoad(e.currentTarget.id);
            $(".contentWrapper").animate({"left": -($('#descriptionPage').position().left)}, 600);
            $("#backGenresArrow").show();
            $('html, body').animate({scrollTop: 0}, 600);
        },
        doNothing: function (e) {
            //do nothing
        },
        listLoad: function () {
            var movies = new MoviesByGenre(28); //loads a collection of action movies. number 28 refers to the code on tmdb for action.
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
            var self = this;
            $(window).on('load', function () { self.listLoad(); });
            return this;
        },
        loadMovie: function (e) {
            detailsView.viewLoad(e.currentTarget.id);
            $("#backGenresArrow").show();
            $(".contentWrapper").animate({"left": -($('#descriptionPage').position().left)}, 600);
            $('html, body').animate({scrollTop: 0}, 600);
        },
        listLoad: function () {
            var movies = new MoviesByGenre(878); //loads a collection of fiction movies. number 878 refers to the code on tmdb for fiction.
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
            var self = this;
            $(window).on('load', function () { self.listLoad(); });
            return this;
        },
        loadMovie: function (e) {
            detailsView.viewLoad(e.currentTarget.id);
            $("#backGenresArrow").show();
            $(".contentWrapper").animate({"left": -($('#descriptionPage').position().left)}, 600);
            $('html, body').animate({scrollTop: 0}, 600);
        },
        listLoad: function () {
            var movies = new MoviesByGenre(37); //loads a collection of western movies. number 37 refers to the code on tmdb for western.
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
            var self = this;
            $(window).on('load', function () { self.listLoad(); });
            return this;
        },
        loadMovie: function (e) {
            detailsView.viewLoad(e.currentTarget.id);
            $("#backGenresArrow").show();
            $(".contentWrapper").animate({"left": -($('#descriptionPage').position().left)}, 600);
            $('html, body').animate({scrollTop: 0}, 600);
        },
        listLoad: function () {
            var movies = new MoviesByGenre(10748); //loads a collection of suspense movies. number 10748 refers to the code on tmdb for suspense.
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

var MovieDetailsView = Backbone.View.extend({
    el: "#movieDetails",
    tpl: _.template($("#movieDetailsTemplate").html()),
    events: {
        "touchend #trailerButton": "showTrailer"
    },
    render: function (id) {

    },
    showTrailer: function(){
        $("#trailerImage").show();
        $("#backGenresArrow").hide();
        $(".contentWrapper").animate({"left": -($('#trailerPage').position().left)}, 300);
        $("#backDetailsArrow").show();
    },
    viewLoad: function (key) {
        if (key) {
            $("#searchImage").hide();
            var movie = new DetailsMovie({id:key});
            var $el = this.$el;
            var template = this.tpl;
            movie.fetch({
                success: function (model, response, options) {
                    $el.find('p').fadeOut(400, function () {
                        $(this).html(template({movie: model.toJSON()})).fadeIn(400);
                    });
                },
                error: function (model, xhr, options) {
                    console.log("Error: ", xhr);
                }
            });
        }
    }
});

var SearchMoviesView = Backbone.View.extend({
        el: "#searchResults",
        tpl: _.template($("#searchTemplate").html()),
        events: {
            "touchend #searchButton": "listLoad",
            "touchend #searchAgainButton": "resetSearch",
            "touchend #searchList li": "loadMovie"
        },
        render: function () {

        },
        loadMovie: function (e) {
            detailsView.viewLoad(e.currentTarget.id);
            $("#backSearchArrow").show();
            $("#backGenresArrow").hide();
            $(".contentWrapper").animate({"left": -($('#descriptionPage').position().left)}, 600);
            $('html, body').animate({scrollTop: 0}, 600);
        },
        listLoad: function () {
            this.close();
            var movies = new MoviesBySearch();
            var $el = this.$el;
            var template = this.tpl;
            movies.setCriteria($("#searchType").val(), $("#searchField").val());
            movies.fetch({
                success: function (collection, response, options) {
                    $el.find('ul').fadeOut(400, function () {
                        $(this).html(template({movies: collection.toJSON()})).fadeIn(400);
                        if (collection.size() > 0) {
                            $("#searchList").jcarousel();
                        }
                    });
                },
                error: function (collection, xhr, options) {
                    console.log("Error: ", xhr);
                }
            });
            $("#searchAgainButton").show();
        },
        resetSearch: function(){
            this.remove();
            $("#searchAgainButton").hide();
            $("#searchField").val("");
        },
        close: function(){
            this.remove();
            $("#searchAgainButton").hide();
        },
        remove: function(){
            this.$('.jcarousel-skin-tango').remove().end().append('<ul id="searchList" class="jcarousel-skin-tango"></ul>');
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


var detailsView = new MovieDetailsView();



//Instantiate Facebook section
InstanciateFacebook = function (d) {
    'use strict';
    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement('script');
    js.id = id;
    js.async = true;
    js.src = "http://connect.facebook.net/en_US/all.js";
    ref.parentNode.insertBefore(js, ref);
};

/*
* @description: Inits the FB object to use locally the Facebook API
*/
InitFacebook = function () {
    'use strict';
    FB.init({
        appId      : '448050108575505', // App ID
        status     : true, // check login status
        cookie     : true, // enable cookies to allow the server to access the session
        xfbml      : true  // parse XFBML
    });
};

/*
* @description: This moethod invoques the Facebook login status to determine if the user is logged into Facebook or not
*/
Login = function () {
    'use strict';
    FB.getLoginStatus(function (response) {
        var currentURL = window.location;
        if (response.status === 'connected') {
            var uid = response.authResponse.userID;
            var accessToken = response.authResponse.accessToken;
            console.log('This user is currently logged into Facebook.');
            if (window.location.href.indexOf("movies") === -1) {
                window.location.replace("/movies.html");
            }
        } else if (response.status === 'not_authorized') {
            if (window.location.href.indexOf("movies") > -1) {
                window.location.replace("/index.html");
            } else {
                if (currentURL == "http://test7.dynamis-soft.com/mobile/" || currentURL == "http://test7.dynamis-soft.com/mobile/index.html") { //If the user is in the index
                    FB.login(function (response) {
                        if (response.authResponse) { //If the user loggin is ok it will be redirected to the movies galllery
                            FB.api('/me', function (response) {
                                $('#userMessage').text('Good to see you, ' + response.name + '.');
                                window.location.replace("/movies.html");
                            });
                        } else {
                            $('#userMessage').text('User cancelled login or did not fully authorize.');
                        }
                    });
                }
            }
        } else { //If the user is not logged into Facebook
            if (window.location.href.indexOf("movies-gallery") > -1) {
                window.location.replace("/index.html");
            } else {
                if (currentURL == "http://test7.dynamis-soft.com/mobile/" || currentURL == "http://test7.dynamis-soft.com/mobile/index.html") { //If the user is in the index
                    FB.login(function (response) {
                        if (response.authResponse) { //If the user loggin is ok it will be redirected to the movies galllery
                            FB.api('/me', function (response) {
                                $('#userMessage').text('Good to see you, ' + response.name + '.');
                                window.location.replace("/movies.html");
                            });
                        } else {
                            $('#userMessage').text('User cancelled login or did not fully authorize.');
                        }
                    });
                }
            }
        }
    });
};



$(function () {
    
//    InstanciateFacebook();
//    InitFacebook();
//    Login();

    //Site general listeners Initialization
    $("#backGenresArrow").on("click touchend", function(event){
        $(".contentWrapper").animate({"left": -($('#mainPage').position().left)}, 300);
        $("#backGenresArrow").hide();
        $("#searchImage").show();
    });
    $("#searchImage").on("click touchend", function(event){
        $(".contentWrapper").animate({"left": -($('#searchPage').position().left)}, 300);
        $("#backGenresArrow").hide();
        $("#searchImage").hide();
        $("#backGenresArrow").show();
    });
    $("#backSearchArrow").on("click touchend", function(event){
        $(".contentWrapper").animate({"left": -($('#searchPage').position().left)}, 300);
        $("#backSearchArrow").hide();
        $("#backGenresArrow").show();
    });
    $("#backDetailsArrow").on("click touchend", function(event){
        $(".contentWrapper").animate({"left": -($('#descriptionPage').position().left)}, 300);
        $("#backGenresArrow").show();
        $("#backDetailsArrow").hide();
        $("#trailerImage").hide();
    });

    //backbone Views initialization
    new ComedyMoviesView().render();
    new ActionMoviesView().render();
    new SuspenseMoviesView().render();
    new FictionMoviesView().render();
    new WesternMoviesView().render();
    new SearchMoviesView().render();
    new Router();
    Backbone.history.start();
});