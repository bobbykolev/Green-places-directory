(function() {
    'use strict';

    var app = angular.module('app', [
        // Angular modules 
        'ngAnimate',
        'ngRoute',
        'ngTouch',
        'common',
        'angulartics',
        'angulartics.google.analytics',

        //app modules
        'app.home',
        'app.place',
        'app.map',
        'app.about',

        'app.directives'
    ]);

    angular.module('app.directives', []);

    app.run(['$route', function($route) {
            // Include $route to kick start the router.
        }
    ]);
})();