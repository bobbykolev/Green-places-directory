(function() {
    'use strict';

    var app = angular.module('app');

    app.controller('Home', Home);
    Home.$inject = ['common', '$timeout', 'places'];

    function Home(common, $timeout, places) {
        var that = this;
        that.places = [];
        that.towns = [];
        that.town = '';
        that.homeTxt = 'Vegan Places';

        //$timeout(function(){activate()}, 2000);//test loading 
        activate();

        function activate() {
            var promises = [getPlaces(), getTowns()];
            common.activateController(promises, 'home');
        }

        function getPlaces() {
            return places.getPlaces().then(function(data) {
                return that.places = data;
            });
        }

        function getTowns() {
            places.getPlaces().then(function(data) {
                that.towns = getUniqueCities(data);
            });
        }

        function getUniqueCities(data) {
            var arr = [];
            for (var i = 0; i < data.length; i++) {
                var cities = data[i].city.split(',');
                for (var j = 0; j < cities.length; j++) {
                    arr.push(cities[j]);
                }
            }

            return common.getUnique(arr);
        }
    }

})();