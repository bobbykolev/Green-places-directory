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
        supportedLangs: ['bg','en']
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
            blogs:"Блогове",
            contact:"Контакти"
        },
        en: {
            home:"Vegan Places",
            place:"Place",
            blogs:"Blogs",
            contact:"Contact"
        }
    };

    app.constant('routes', getRoutes());

    // Configure the routes and route resolvers
    app.config(['$routeProvider', 'routes', routeConfigurator]);

    function routeConfigurator($routeProvider, routes) {

        routes.forEach(function(r) {
            $routeProvider.when(r.url, r.config);
        });
        $routeProvider.otherwise({
            redirectTo: '/'
        });
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
        /*{
            url: '/blogs',
            config: {
                templateUrl: 'app/modules/blogs/blogs.html',
                title: routeTxts[config.lang].blogs,
                settings: {
                    nav: 2,
                    content: '<i class="fa fa-pencil"></i> ' + routeTxts[config.lang].blogs
                }
            }
        },*/
        {
            url: '/contact',
            config: {
                templateUrl: 'app/modules/contact/contact.html',
                title: routeTxts[config.lang].contact,
                settings: {
                    nav: 3,
                    content: '<i class="fa fa-envelope"></i> ' + routeTxts[config.lang].contact
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