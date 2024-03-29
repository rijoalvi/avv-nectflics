/*movie data, actor and image API*/

var Netflics = Netflics || {};

/*
* @description: Object that contains the Movies struccture
* @param genreID: Movies Genre id
* @param genreName: Movies Genre name
* @param movieResult: Array of Movies for a specific Genre
* @param movieDescription: Array of descriptions for each movie
*/
Netflics.Movies = function (genreID, genreName, movieResult, movieDescription, movieRelease) {
    'use strict';
    var genre = {
        name : genreName,
        id : genreID,
        movieInfo : []
    };

    for (var i = 0; movieResult.results.length >= 0 && i < 19; i++) {
        genre.movieInfo.push({
            title : movieResult.results[i].title,
            coverImage : "http://cf2.imgobject.com/t/p/w185/" + movieResult.results[i].poster_path,
            id : movieResult.results[i].id,
            description: movieDescription[i],
            release: movieRelease[i]
        });
    };
    
    /*
    * @description: Method that return the genre name
    */
    this.getGenresName = function () {
        return genre.name;
    };

    /*
    * @description: Method that return the genre id
    */
    this.getGenreId = function () {
        return genre.id;
    };

    /*
    * @description: Method that return an array of moviesInfo and their attributes 
    */
    this.getMoviesArray =  function () {
        return genre.movieInfo;
    };

    /*
    * @description: Method that return an specific moviesInfo
    * @param movieFlag: Can be a movie ID(Number) or a movie Name(String)
    */
    this.getMovieInfoByMovieNameOrId =  function (movieFlag) {
        var specificMovieInfo = {};
        for (var i = 0; genre.movieInfo.length >= 0  && i < 19; i++) {
             if (genre.movieInfo[i].title == movieFlag || genre.movieInfo[i].id == movieFlag) {
                specificMovieInfo = genre.movieInfo[i];
                i = 19;             
            };
        };
        return specificMovieInfo;
    };

    /*
    * @description: Method that return an array of movies names
    */
    this.getMovieNamesArray = function () {
        var moviesNames = [];
        for (var i = 0; genre.movieInfo.length >= 0  && i < 19; i++) {
            moviesNames.push(genre.movieInfo[i].title);
        };
        return moviesNames;
    };

    /*
    * @description: Method that return an array of movies ids
    */
    this.getMovieIdsArray = function () {
        var moviesIds = [];
        for (var i = 0; genre.movieInfo.length >= 0  && i < 19; i++) {
            moviesIds.push(genre.movieInfo[i].id);
        };
        return moviesIds;
    };

    /*
    * @description: Method that return an specific movie name
    * @param movieId: The id(Number) of a specific movie
    */
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

    /*
    * @description: Method that return an specific movie id
    * @param movieName: The name(String) of a specific movie
    */
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

    /*
    * @description: Method that return an specific attribute data from an specific movie
    * @param typeOfData: The attribute name(String)
    * @param movieFlag: Can be a movie ID(Number) or a movie Name(String)
    */
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

/*
* @description: Object with a serius of ajax async false request for get the necessary movies datas form the api
*/
Netflics.Service = function () {
    /*
    * @description: Method that return a json of genres names and theirs id
    */
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

    /*
    * @description: Method that return a json of movies names and theirs id and some other data
    * @param genreID: The id(Number) of a specific genre
    */
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

    /*
    * @description: Method that return a specific movie overview and release date
    * @param movieId: The id(Number) of a specific movie
    */
    this.getMovieExtraInfoById = function (movieId) {
        var movieExtraInfo = {};
        $.ajax({
            async: false,
            type: 'GET',
            dataType: 'json',
            url: 'http://private-f481-themoviedb.apiary.io/3/movie/' + movieId + '?api_key=d0685fdb19e4c0aa2fbc292873dc2cc0',
            success: function(json) {
                movieExtraInfo.release = json.release_date;
                movieExtraInfo.overview = json.overview;
            },
            error: function(e) {
                console.log(e.message);
                alert("Error");
            }
        });
        return movieExtraInfo;
    };
};

/*
* @description: Object in charge of controll the interaction between Service, Movies, and the UIManager
*/
Netflics.Controller = function () {
    var moviesArray = [];
    var movieExtraInfo = {};
    var movieService = new Netflics.Service();
    var listOfGenres = movieService.getListOfGenre();
    var movieRelease = [];
    var movieOverview = [];
    for (var i = 0; i < 5; i++) {
        var genreID = listOfGenres.genres[i].id;
        var genreName = listOfGenres.genres[i].name;
        var movieInfo = movieService.getListOfMoviesByGenres(listOfGenres.genres[i].id);
        for (var j = 0; listOfGenres.genres.length >= 0  && j < 19; j++) {
            movieExtraInfo = movieService.getMovieExtraInfoById(movieInfo.results[j].id);
            movieRelease[j] = movieExtraInfo.release;
            movieOverview[j] = movieExtraInfo.overview;
        };
        var moviesReal = new Netflics.Movies(genreID, genreName, movieInfo, movieOverview, movieRelease);
        moviesArray.push(moviesReal);
    };
    Netflics.ShowMoviesLists(moviesArray);

};

/*
* @description: displays the movies galleries in the front end
* @param moviesArray: Array with all the movies info
*/
Netflics.ShowMoviesLists = function (moviesArray) {
    'use strict';
    var tempArray = new Array();
    var idTemp = 1;
    for (var i = 0; i < moviesArray.length; i++) {
        tempArray = moviesArray[i].getMoviesArray();
        for (var j = 0; j < 10; j++) {
            var body = '<div class="popup"><p><b>Title</b>: ' + tempArray[j].title + '</p><p><b>Description</b>: <textarea readonly>' + tempArray[j].description + '</textarea></p><p><b>Release date</b>: ' + tempArray[j].release + '</p><p><a href="view-movie.html" title="View Movie">View Movie</a></p></div>';
            var item = '<li id="' + tempArray[j].id + '"><a href="#" class="trigger"><img src="' + tempArray[j].coverImage + '" title="' + tempArray[j].title + '"" /></a>' + body + '</li>';
            $('#list' + idTemp).append(item);
        };
        idTemp++;
    };
    Netflics.UIManager();
};

/*
* @description: Add listeners to the DOM catched elements
*/
Netflics.Listener = function () {
    'use strict';
    var idTemp = 1;
    this.listen = function (cache) {
        for (var i = 0 ; i < 5; i++) {
            cache["list"+idTemp].jcarousel({wrap: 'last'});
            idTemp++;
        };
    };
};

/*
* @description: Creates a cache of the DOM elements to manage quickly the user interface.
*/
Netflics.UIManager = function () {
    'use strict';
    var cache = {
        list1: $('#list1'),
        list2: $('#list2'),
        list3: $('#list3'),
        list4: $('#list4'),
        list5: $('#list5')
    };
    var listener = new Netflics.Listener();
    listener.listen(cache);
};

/*
* @description: Get a url variable receiving it's name by parameter and returns it's value
* @param name: name of the parameter
*/
Netflics.getUrlVar = function (name) {
    'use strict';
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec(window.location.href);
    if (results === null){
    return "";
    } else {
    return results[1];
    }
};

/*
* @description: Does a search by ajax using a key word
* @param name: name of the parameter
*/
Netflics.Search = function (q) {
    'use strict';
    var qResults = {};
    var ulResults = $("#list1");
    var item = "";
    var body = "";
    var movieExtraInfo = {};
    var movieService = new Netflics.Service();
    $.ajax({
        async: false,
        type: 'GET',
        dataType: 'json',
        url: 'http://api.themoviedb.org/3/search/movie?api_key=d0685fdb19e4c0aa2fbc292873dc2cc0&query=' + q,
        success: function(json) {
            qResults = json;
        },
        error: function(e) {
            console.log(e.message);
            alert("Error");
        }
    });
    for(var i = 0; i < qResults.results.length; i++){
        movieExtraInfo = movieService.getMovieExtraInfoById(qResults.results[i].id);
        body = '<div class="popup"><p><b>Title</b>: ' + qResults.results[i].title + '</p><p><b>Description</b>:  <textarea readonly>' + movieExtraInfo.overview + '</textarea></p><p><b>Release date</b>: ' + movieExtraInfo.release + '</p><p><a href="view-movie.html" title="View Movie">View Movie</a></p></div>';
        item = '<li id="' + qResults.results[i].id + '"><a href="#" class="trigger"><img src="http://cf2.imgobject.com/t/p/w185/' + qResults.results[i].poster_path + '" title="' + qResults.results[i].title + '"" /></a>' + body + '</li>';
        //item = '<img src="http://cf2.imgobject.com/t/p/w185/' + qResults.results[i].poster_path + '" />'
        ulResults.append(item);
    }
    ulResults.jcarousel({wrap: 'last'});
};

/*
* @description: Instanciates the Facebook API in the local website
*/
Netflics.InstanciateFacebook = function (d) {
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
Netflics.InitFacebook = function () {
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
Netflics.Login = function () {
    'use strict';
    FB.getLoginStatus(function (response) {
        var currentURL = window.location;
        if (response.status === 'connected') {
            var uid = response.authResponse.userID;
            var accessToken = response.authResponse.accessToken;
            console.log('This user is currently logged into Facebook.');
            if (window.location.href.indexOf("movies-gallery") === -1 && window.location.href.indexOf("search") === -1 && window.location.href.indexOf("view-movie") === -1) {
                window.location.replace("/movies-gallery.html");
            }
            $('#userMessage').text('Good to see you, ' + response.name + '.');
        } else if (response.status === 'not_authorized') {
            if (window.location.href.indexOf("movies-gallery") > -1 || window.location.href.indexOf("search") > -1 || window.location.href.indexOf("view-movie") > -1) {
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
            if (window.location.href.indexOf("movies-gallery") > -1 || window.location.href.indexOf("search") > -1 || window.location.href.indexOf("view-movie") > -1) {
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
};


/*(function (d) {
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
}(document));*/