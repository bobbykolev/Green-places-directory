(function() {
    'use strict';

    var app = angular.module('app', [
        // Angular modules 
        'ngAnimate',
        'ngRoute',
        'ngSanitize',
        'common'
    ]);

    app.run(['$route',
        function($route) {
            // Include $route to kick start the router.
        }
    ]);
})();