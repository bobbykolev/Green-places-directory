(function() {
    'use strict';

    var app = angular.module('app');

    app.controller('Home', Home);
    Home.$inject = ['common', 'places', '$scope'];

    function Home(common, places, $scope) {
        var that = this;
        that.places = [];

        that.towns = [];
        that.town = '';

        that.vTypes = ["-vegan-", "-vegetarian-", "-other-"];
        that.vType = '';

        that.homeTitle = 'Places';
        
        //watch and save last selected town filter 
        $scope.$watch(
            "that.town",
            function(newValue, oldValue) {
                if (localStorage && (newValue != oldValue)) {
                    localStorage.setItem('currentVplace', newValue);
                }
            }
        );

        that.trimed = function(str){
            //todo: refactor, impl capitalize to common 
            var txt = str.replace(/-/gi, '');
            return txt[0].toUpperCase() + txt.slice(1);
        };

        activate();

        function activate() {
            var promises = [getPlaces(), getTowns()];
            common.activateController(promises, 'home');

            getCurentTownFilter();
        }

        function getPlaces() {
            return places.getPlaces().then(function(data) {
                return that.places = data;
            });
        }

        function getTowns() {
            places.getPlaces().then(function(data) {
                that.towns = getUniqueTowns(data);
            });
        }

        function getUniqueTowns(data) {
            var arr = [];
            for (var i = 0; i < data.length; i++) {
                var t = data[i].town.split(',');
                for (var j = 0; j < t.length; j++) {
                    arr.push(t[j]);
                }
            }

            return common.getUnique(arr);
        }

        function getCurentTownFilter(){
            if (localStorage) {
                that.town = localStorage.getItem('currentVplace') || '';
            }
        }
    }

})();