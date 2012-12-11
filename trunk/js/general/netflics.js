/*movie data, actor and image API*/

var Netflics = Netflics || {};

Netflics.Movies = function (allMovies) {

};

Netflics.Service = function () {

};

Netflics.UIManager = function () {

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
    }
}());