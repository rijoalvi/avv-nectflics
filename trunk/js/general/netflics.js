/*movie data, actor and image API*/

var Netflics = Netflics || {};

Netflics.Movies = function (genreID, genreName, movieResult, movieDescription) {
    var genre = {
        name : genreName,
        id : genreID,
        movieInfo : []
    };

    for (var i = 0; movieResult.results.length >= 0 && i < 19; i++) {
        genre.movieInfo.push({
            title : movieResult.results[i].title,
            coverImage : "http://cf2.imgobject.com/t/p/w185/" + movieResult.results[i].backdrop_path,
            id : movieResult.results[i].id,
            description: movieDescription[i]
        });
    };
    
    this.getGenresName = function () {
        return genre.name;
    };

    this.getGenreId = function () {
        return genre.id;
    };

    this.getMoviesArray =  function () {
        return genre.movieInfo;
    };

    this.getMovieInfoByMovieNameOrId =  function (movieFlag) {
        var specificMovieInfo = {};
        for (var i = 0; genre.movieInfo.length >= 0  && i < 19; i++) {
            console.log(genre.movieInfo[i].title);
             if (genre.movieInfo[i].title == movieFlag || genre.movieInfo[i].id == movieFlag) {
                specificMovieInfo = genre.movieInfo[i];
                i = 19;             
            };
        };
        return specificMovieInfo;
    };

    this.getMovieNamesArray = function () {
        var moviesNames = [];
        for (var i = 0; genre.movieInfo.length >= 0  && i < 19; i++) {
            moviesNames.push(genre.movieInfo[i].title);
        };
        return moviesNames;
    };

    this.getMovieIdsArray = function () {
        var moviesIds = [];
        for (var i = 0; genre.movieInfo.length >= 0  && i < 19; i++) {
            moviesIds.push(genre.movieInfo[i].id);
        };
        return moviesIds;
    };

    this.getMovieNameByMovieId = function (movieId) {
        var movieName = "";
        for (var i = 0; genre.movieInfo.length >= 0  && i < 19; i++) {
             if (genre.movieInfo[i].id == movieId) {
                movieName = genre.movieInfo[i].title
                i = 19;
             };
        };
        return movieName;
    };

    this.getMovieIdByMovieName = function (movieName) {
        var movieId = "";
        for (var i = 0; genre.movieInfo.length >= 0  && i < 19; i++) {
             if (genre.movieInfo[i].title == movieName) {
                movieId = genre.movieInfo[i].id;
                i = 19;             
            };
        };
        return movieId;
    };

    this.getSpecificMovieDataByMovieNameOrId = function (typeOfData, movieFlag) {
        var movieData = "";
        for (var i = 0; genre.movieInfo.length >= 0  && i < 19; i++) {
             if (genre.movieInfo[i].title == movieFlag || genre.movieInfo[i].id == movieFlag) {
                movieData = genre.movieInfo[i][typeOfData];
                i = 19;             
            };
        };
        return movieData;
    };
};

Netflics.Service = function () {
    this.getListOfGenre = function () {
        var listOfAvailableGenres = {};
        $.ajax({
            async: false,
            type: 'GET',
            dataType: 'json',
            url: 'http://private-f481-themoviedb.apiary.io/3/genre/list?api_key=d0685fdb19e4c0aa2fbc292873dc2cc0',
            success: function(data) {
                listOfAvailableGenres = data;
            }, 
            error: function(e) {
                console.log(e.message);
                alert("Error");
            }
        });
        return listOfAvailableGenres;
    };

    this.getListOfMoviesByGenres = function (genreID) {
        var listOfMoviesByGenres = {};
        $.ajax({
            async: false,
            type: 'GET',
            dataType: 'json',
            url: 'http://private-f481-themoviedb.apiary.io/3/genre/' + genreID + '/movies?api_key=d0685fdb19e4c0aa2fbc292873dc2cc0',
            success: function(json) {
                listOfMoviesByGenres = json;
            },
            error: function(e) {
                console.log(e.message);
                alert("Error");
            }
        });
        return listOfMoviesByGenres;
    };

    this.getMovieOverviewById = function (movieId) {
        var movieOverview = {};
        $.ajax({
            async: false,
            type: 'GET',
            dataType: 'json',
            url: 'http://private-f481-themoviedb.apiary.io/3/movie/' + movieId + '?api_key=d0685fdb19e4c0aa2fbc292873dc2cc0',
            success: function(json) {
                movieOverview = json.overview;
            },
            error: function(e) {
                console.log(e.message);
                alert("Error");
            }
        });
        return movieOverview;
    };
};

Netflics.Controller = function () {
    var moviesArray = [];
    var movieOverview = [];
    var movieService = new Netflics.Service();
    var listOfGenres = movieService.getListOfGenre();

    for (var i = 0; listOfGenres.genres.length >= 0  && i < 5; i++) {
        var genreID = listOfGenres.genres[i].id;
        var genreName = listOfGenres.genres[i].name;
        var movieInfo = movieService.getListOfMoviesByGenres(listOfGenres.genres[i].id);
        for (var u = 0; listOfGenres.genres.length >= 0  && u < 19; u++) {
            movieOverview[u] = movieService.getMovieOverviewById(movieInfo.results[u].id);
        };
        var moviesReal = new Netflics.Movies(genreID, genreName, movieInfo, movieOverview);
        moviesArray.push(moviesReal);
    };
    var example = moviesArray[0].getSpecificMovieDataByMovieNameOrId("coverImage", "Star Wars: Episode V - The Empire Strikes Back");
    console.log(example);
};

/*Netflics.Listener = function (cache) {
    'use strict';
    this.listen = function () {
        cache.list1.jcarousel({wrap: 'circular'});
        cache.list1.on('hover', 'li', function (e) {
            e.preventDefault();
            //console.log($(this).attr('id'));
            $(this).find('#movie-title').text('Prueba');
        });
    };
};

Netflics.UIManager = function () {
    'use strict';
    var myArray1 = [];
    var cache = {
        list1: $('#list1')
    };
    this.initialize = function () {
        var listener = new Netflics.Listener(cache);
        listener.listen();
    };
};

Netflics.getMoviesbyGenre = function (genre) {
    'use strict';
    var myArray = [];
    $.ajax({
        async: false,
        type: 'GET',
        dataType: 'json',
        url: 'http://api.themoviedb.org/3/genre/' + genre + '/movies?api_key=d0685fdb19e4c0aa2fbc292873dc2cc0',
        success: function (data) {
            //var myList = "";
            $.each(data.results, function (i, item) {
                myArray.push(this);
            });
        }

    });
    for (var i=0; i < myArray.length; i++) {
        //console.log(myArray[i].original_title + "\n");
        var path = "http://cf2.imgobject.com/t/p/w185" + myArray[i].poster_path;
        var body = '<div class="popup"><p id="movie-title"></p><p id="movie-overview"></p><p id="movie-year"></p><a href="#" /></div>';
        var item = '<li id="' + myArray[i].id + '"><a href="#" class="trigger"><img src="' + path + '" /></a>' + body + '</li>';
        $('#list1').append(item);
    }
};

(function () {
    'use strict';
    FB.init({
        appId      : '448050108575505', // App ID
        status     : true, // check login status
        cookie     : true, // enable cookies to allow the server to access the session
        xfbml      : true  // parse XFBML
    });
    FB.getLoginStatus(function (response) {
        var currentURL = window.location;
        if (response.status === 'connected') {
            console.log(response);
            var uid = response.authResponse.userID;
            var accessToken = response.authResponse.accessToken;
            console.log('This user is currently logged into Facebook.');
            if (window.location.href.indexOf("movies-gallery") === -1) {
                window.location.replace("/movies-gallery.html");
            }
        } else if (response.status === 'not_authorized') {
            if (window.location.href.indexOf("movies-gallery") > -1) {
                window.location.replace("/index.html");
            } else {
                if (currentURL == "http://test7.dynamis-soft.com/" || currentURL == "http://test7.dynamis-soft.com/index.html") { //If the user is in the index
                    FB.login(function (response) {
                        if (response.authResponse) { //If the user loggin is ok it will be redirected to the movies galllery
                            FB.api('/me', function (response) {
                                $('#userMessage').text('Good to see you, ' + response.name + '.');
                                window.location.replace("/movies-gallery.html");
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
                if (currentURL == "http://test7.dynamis-soft.com/" || currentURL == "http://test7.dynamis-soft.com/index.html") { //If the user is in the index
                    FB.login(function (response) {
                        if (response.authResponse) { //If the user loggin is ok it will be redirected to the movies galllery
                            FB.api('/me', function (response) {
                                $('#userMessage').text('Good to see you, ' + response.name + '.');
                                window.location.replace("/movies-gallery.html");
                            });
                        } else {
                            $('#userMessage').text('User cancelled login or did not fully authorize.');
                        }
                    });
                }
            }
        }
    });
})();

(function (d) {
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
}(document));

(function () {
    'use strict';
    var isMobile = $.browser.mobile;
    if (isMobile) {
        window.location.replace("/mobile/");
    } else {
        Netflics.getMoviesbyGenre(28);
        var myNetflics = new Netflics.UIManager();
        myNetflics.initialize();
    }
}());*/

/*$(document).ready(function() {
    Netflics.Controller();
});*/