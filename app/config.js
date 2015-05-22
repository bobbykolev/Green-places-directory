(function() {
    'use strict';

    var app = angular.module('app');

    var events = {
        controllerActivateSuccess: 'controller.activateSuccess',
        spinnerToggle: 'spinner.toggle'
    };

    var config = {
        events: events,
        appErrorPrefix: '[VP Error]',
        lang: locale(),
        setLang: setlocale,
        supportedLangs: ['bg','en'],
        timeZoneGap: 3
    };

    app.value('config', config);

    app.config(['commonConfigProvider', setEvensConfig]);

    function setEvensConfig(commonConfigProvider) {
        commonConfigProvider.config.controllerActivateSuccessEvent = config.events.controllerActivateSuccess;
        commonConfigProvider.config.spinnerToggleEvent = config.events.spinnerToggle;
    }

    function locale() {
        if ((localStorage.getItem('vp_locale') || window.navigator.language || window.navigator.userLanguage).toLowerCase().substring(0,2) == 'bg') {
            return 'bg';
        }

        return 'en';
    }

    function setlocale(lang) {
        if (localStorage) {
            localStorage.setItem('vp_locale', lang);
        }
    }

    //Routes
    var routeTxts = {
        bg: {
            home:"Веган Заведения",
            place:"Заведение",
            map:"Карта",
            about:"За Нас"
        },
        en: {
            home:"Vegan Places",
            place:"Place",
            map:"Map",
            about:"About"
        }
    };

    app.constant('routes', getRoutes());

    // Configure the routes and route resolvers
    app.config(['$routeProvider', 'routes', '$locationProvider', routeConfigurator]);

    function routeConfigurator($routeProvider, routes, $locationProvider) {

        routes.forEach(function(r) {
            $routeProvider.when(r.url, r.config);
        });
        $routeProvider.otherwise({
            redirectTo: '/'
        });

        //$locationProvider.hashPrefix('!');
    }

    // Define the routes 
    function getRoutes() {
        return [{
            url: '/',
            config: {
                templateUrl: 'app/modules/home/home.html',
                title: routeTxts[config.lang].home,
                settings: {
                    nav: 1,
                    content: '<i class="fa fa-home"></i> ' + routeTxts[config.lang].home
                }
            }
        },{
            url: '/places/:placeId',
            config: {
                templateUrl: 'app/modules/place/place.html',
                title: routeTxts[config.lang].place,
                settings: {
                    nav: null,
                    content: ''
                }
            }
        },
        {
            url: '/map',
            config: {
                templateUrl: 'app/modules/map/map.html',
                title: routeTxts[config.lang].map,
                settings: {
                    nav: 2,
                    content: '<i class="fa fa-map-marker"></i> ' + routeTxts[config.lang].map
                }
            }
        },
        {
            url: '/about',
            config: {
                templateUrl: 'app/modules/about/about.html',
                title: routeTxts[config.lang].about,
                settings: {
                    nav: 3,
                    content: '<i class="fa fa-info-circle"></i> ' + routeTxts[config.lang].about
                }
            }
        }];
    }

    app.config(['$provide', function ($provide) {
        $provide.decorator('$exceptionHandler',
            ['$delegate', 'config', extendExceptionHandler]);
    }]);
    
    function extendExceptionHandler($delegate, config) {
        var appErrorPrefix = config.appErrorPrefix;

        return function (exception, cause) {
            $delegate(exception, cause);
            if (appErrorPrefix && exception.message.indexOf(appErrorPrefix) === 0) { return; }

            var errorData = { exception: exception, cause: cause };
            var msg = appErrorPrefix + exception.message;
            console.error(msg, errorData);
        };
    }

})();