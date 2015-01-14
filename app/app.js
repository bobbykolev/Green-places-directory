(function() {
    'use strict';

    var app = angular.module('app', [
        // Angular modules 
        'ngAnimate',
        'ngRoute',
        'ngSanitize',
        'common',

        //app modules
        'app.home',
        'app.place',
        'app.blogs',
        'app.contact',

        'app.directives'
    ]);

    angular.module('app.directives', []);

    app.run(['$route', function($route) {
            // Include $route to kick start the router.
        }
    ]);
})();