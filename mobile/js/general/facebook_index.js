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
        console.log(response);
        if (response.status === 'connected') {
            var uid = response.authResponse.userID;
            var accessToken = response.authResponse.accessToken;
            console.log('This user is currently logged into Facebook.');
            if (window.location.href.indexOf("movies") === -1 || window.location.href.indexOf("search") === -1 || window.location.href.indexOf("view-movie") === -1) {
                window.location.replace("/mobile/movies.html");
            }
            $('#userMessage').text('Good to see you, ' + response.name + '.');
        } else if (response.status === 'not_authorized') {
            if (window.location.href.indexOf("movies") > -1 || window.location.href.indexOf("search") > -1 || window.location.href.indexOf("view-movie") > -1) {
                window.location.replace("/index.html");
            } else {
                if (currentURL == "http://test7.dynamis-soft.com/mobile/" || currentURL == "http://test7.dynamis-soft.com/mobile/index.html") { //If the user is in the index
                    FB.login(function (response) {
                        if (response.authResponse) { //If the user loggin is ok it will be redirected to the movies galllery
                            FB.api('/me', function (response) {
                                $('#userMessage').text('Good to see you, ' + response.name + '.');
                                window.location.replace("/test123/mobile/movies.html");
                            });
                        } else {
                            $('#userMessage').text('User cancelled login or did not fully authorize.');
                        }
                    });
                }
            }
        } else { //If the user is not logged into Facebook
            if (window.location.href.indexOf("movies") > -1 || window.location.href.indexOf("search") > -1 || window.location.href.indexOf("view-movie") > -1) {
                window.location.replace("/index.html");
            } else {
                if (currentURL == "http://test7.dynamis-soft.com/mobile/" || currentURL == "http://test7.dynamis-soft.com/mobile/index.html") { //If the user is in the index
                    FB.login(function (response) {
                        if (response.authResponse) { //If the user loggin is ok it will be redirected to the movies galllery
                            FB.api('/me', function (response) {
                                $('#userMessage').text('Good to see you, ' + response.name + '.');
                                window.location.replace("/test123/mobile/movies.html");
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


/*
* @description: Inits the application. Sets listeners for the elements that aren't inside any views, and initializes the backbone views
*/
$(function () {
    //facebook login check initialization
    InstanciateFacebook(document);
    InitFacebook();
    Login();
});