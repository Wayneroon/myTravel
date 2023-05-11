'use strict';

define([
		'app', //생성한 앵귤러 모듈에 루트를 등록하기 위해 임포트
		'route-config' //루트를 등록하는 routeConfig를 사용하기 위해 임포트
	],

	function (MyTravelApp, routeConfig) {
	
		//app은 생성한 myApp 앵귤러 모듈
		return MyTravelApp.config(function ($routeProvider, $httpProvider) {

			$routeProvider.when('/login', routeConfig.config('../partials/login.html', 'controllers/login', {
				directives: ['directives/top'],
				services: [], 
				filters: ['filters/reverse']
			}));
			
			$routeProvider.when('/home', routeConfig.config('../partials/home.html', 'controllers/home', {
				directives: ['directives/top'],
				services: ['services/tester'],
				filters: []
			}))
			.when('/search', routeConfig.config('../partials/home.html', 'controllers/home', {
				directives: ['directives/top'],
				services: ['services/tester'],
				filters: []
			}))
			.when('/search', routeConfig.config('../partials/search.html', 'controllers/home', {
				directives: ['directives/top'],
				services: ['services/tester'],
				filters: []
			}))
			.when('/share', routeConfig.config('../partials/share.html', 'controllers/home', {
				directives: ['directives/top'],
				services: ['services/tester'],
				filters: []
			}))
			.when('/setting', routeConfig.config('../partials/setting.html', 'controllers/home', {
				directives: ['directives/top'],
				services: ['services/tester'],
				filters: []
			}))
			.when('/main', routeConfig.config('../partials/top.html', 'controllers/home', {
				directives: ['directives/top'],
				services: ['services/tester'],
				filters: []
			}));


			//기본 경로 설정
			$routeProvider.otherwise({redirectTo:'/login'});

			$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

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
		});
});
