(function() {
    'use strict';

    var app = angular.module('app');

    var events = {
        controllerActivateSuccess: 'controller.activateSuccess',
        spinnerToggle: 'spinner.toggle'
    };

    var config = {
        events: events
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
                controller: 'Home',
                controllerAs: 'that',
                title: 'Home',
                settings: {
                    nav: 1,
                    content: '<i class="fa fa-home"></i> Vegan Places'
                }
            }
        }, {
            url: '/admin',
            config: {
                templateUrl: 'app/modules/admin/admin.html',
                controller: 'Admin',
                controllerAs: 'that',
                title: 'Admin',
                settings: {
                    nav: 2,
                    content: '<i class="fa fa-cog"></i> Admin'
                }
            }
        }, {
            url: '/places/:placeId',
            config: {
                templateUrl: 'app/modules/place/place.html',
                controller: 'Place',
                controllerAs: 'that',
                title: 'Place',
                settings: {
                    nav: null,
                    content: ''
                }
            }
        }];
    }

})();