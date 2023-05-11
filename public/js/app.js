'use strict';

var MyTravelApp = angular.module('MyTravelApp', ['ngRoute', "loginCtrl", "homeCtrl", "ngMaterial"]);

MyTravelApp.config(['$routeProvider', '$httpProvider',
    function ($routeProvider, $httpProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'partials/login.html',
            controller: 'loginCtrl'
        }).when('/logout', {
            controller: 'loginCtrl'
        })
        .when('/home', {
            templateUrl: 'partials/home.html',
            controller: 'homeCtrl'
        })



            .otherwise({
            redirectTo: '/login'
        });



        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyBj_KXa13LSXgWbUk-5ILQXGPOU4iLyFaY",
            authDomain: "mytravel-12b37.firebaseapp.com",
            databaseURL: "https://mytravel-12b37.firebaseio.com",
            storageBucket: "mytravel-12b37.appspot.com",
            messagingSenderId: "674810416969"
        };
        firebase.initializeApp(config);

        Kakao.init('6d74e9fbc878ad0d8002443dec57dcfb');

        console.log(firebase);




        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=euc-kr';

        $httpProvider.defaults.transformRequest = function (obj) {
            var nullStrip = function (obj) {
                var r = {};
                for (var key in obj) {
                    if (obj[key] != null) r[key] = obj[key];
                }
                return r;
            };

            var str = "json=" + angular.toJson(nullStrip(obj));
            return str;
        }

    }]);

