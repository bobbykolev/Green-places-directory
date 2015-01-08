(function() {
    'use strict';

    var app = angular.module('app');

    app.controller('Place', Place);
    Place.$inject = ['$routeParams', '$scope', 'common', 'places'];

    function Place($routeParams, $scope, common, places) {
        var that = this;
        that.days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        that.place = {};
        that.initRating = 5;
        that.rating = 5;

        $scope.rateFunction = function(rating) {
            alert("Rating selected - " + rating);
        };
        
        $scope.$watch(
            "that.rating",
            function(newValue, oldValue) {

            }
        );

        activate();

        function activate() {
            var promises = [getPlace(), getInitRating()];
            common.activateController(promises, 'home');
        }

        function getPlace() {
            places.getPlace($routeParams.placeId).then(function(data){
                that.place = data;
            });
        }

        function getInitRating() {
            places.getPlace($routeParams.placeId).then(function(data){
                that.initRating = that.rating = data.rating;
            });
        }
    }

})();