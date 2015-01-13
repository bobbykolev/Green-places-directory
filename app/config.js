(function() {
    'use strict';

    var app = angular.module('app');

    var events = {
        controllerActivateSuccess: 'controller.activateSuccess',
        spinnerToggle: 'spinner.toggle'
    };

    var config = {
        events: events,
        lang: (window.navigator.language || 'en-US').substring(0,2)
    };

    app.value('config', config);

    app.config(['commonConfigProvider', setEvensConfig]);

    function setEvensConfig(commonConfigProvider) {
        commonConfigProvider.config.controllerActivateSuccessEvent = config.events.controllerActivateSuccess;
        commonConfigProvider.config.spinnerToggleEvent = config.events.spinnerToggle;
    }

    //Routes
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
                title: 'Home',
                settings: {
                    nav: 1,
                    content: '<i class="fa fa-home"></i> Vegan Places'
                }
            }
        },{
            url: '/places/:placeId',
            config: {
                templateUrl: 'app/modules/place/place.html',
                title: 'Place',
                settings: {
                    nav: null,
                    content: ''
                }
            }
        },{
            url: '/blogs',
            config: {
                templateUrl: 'app/modules/blogs/blogs.html',
                title: 'Blogs',
                settings: {
                    nav: 2,
                    content: '<i class="fa fa-pencil"></i> Blogs'
                }
            }
        },{
            url: '/contact',
            config: {
                templateUrl: 'app/modules/contact/contact.html',
                title: 'Contact',
                settings: {
                    nav: 3,
                    content: '<i class="fa fa-envelope"></i> Contact'
                }
            }
        },];
    }

})();