(function() {
    'use strict';

    var app = angular.module('app');

    app.controller('Shell', Shell);

    Shell.$inject = ['$rootScope', 'common', 'config'];

    function Shell($rootScope, common, config) {
        var that = this,
            events = config.events;
        that.isBusy = true;
        that.busyMessage = 'Loading...';

        activate();

        function activate() {
            common.activateController([], 'shell');
        }

        function toggleSpinner(on) {
            that.isBusy = on;
        }

        $rootScope.$on('$routeChangeStart',
            function(event, next, current) {
                toggleSpinner(true);
            }
        );

        $rootScope.$on(events.controllerActivateSuccess,
            function(event, data) {
                toggleSpinner(false);
            }
        );

        $rootScope.$on(events.spinnerToggle,
            function(event, data) {
                toggleSpinner(data.show);
            }
        );
    }

})();