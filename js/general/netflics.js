/*movie data, actor and image API*/

var Netflics = Netflics || {};

Netflics.Movies = function (allMovies) {
    'use strict';
};

Netflics.Service = function () {
    'use strict';
};

Netflics.Listener = function (cache) {
    'use strict';
    this.listen = function () {
        cache.list1.jcarousel({wrap: 'circular'});
        cache.el.on('click', 'a', function (e) {
            e.preventDefault();
            alert($(this).attr('id'));
        })
    };
};

Netflics.UIManager = function () {
    'use strict';
    var myArray1 = [];
    var cache = {
        list1: $('#list1'),
        el: $('#list1 li')
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
        var item = '<li><a href="#" id="' + myArray[i].id + '"><img src="' + path + '" /></a></li>';
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
        var currenURL = window.location;
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
                if (currenURL == "http://test3.aceldama-metal.com/" || currenURL == "http://test3.aceldama-metal.com/index.html") { //If the user is in the index
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
                if (currenURL == "http://test3.aceldama-metal.com/" || currenURL == "http://test3.aceldama-metal.com/index.html") { //If the user is in the index
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
}());