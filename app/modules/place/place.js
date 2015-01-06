(function() {
    'use strict';

    var app = angular.module('app');

    app.controller('Place', Place);
    Place.$inject = ['$routeParams', 'common', 'places'];

    function Place($routeParams, common, places) {
        var that = this;
        that.place = {};
        
        activate();

        function activate() {
            var promises = [getPlace()];
            common.activateController(promises, 'home');
        }

        function getPlace() {
            places.getPlace($routeParams.placeId).then(function(data){
                that.place = data;
            });
        }
    }

})();