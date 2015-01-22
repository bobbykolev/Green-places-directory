(function() {
    'use strict';

    var app = angular.module('app.place', []);

    app.controller('Place', Place);

    Place.$inject = ['$routeParams', '$scope', 'config', 'common', 'placesService'];

    function Place($routeParams, $scope, config, common, placesService) {
        var that = this,
            transTxts = {
                bg: {
                    days:["Понеделник", "Вторник", "Сряда", "Четвъртък", "Петък", "Събота", "Неделя"]
                },
                en: {
                    days:["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
                }
            };

        that.days = transTxts[config.lang].days;
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
            var promises = [getInitalPlaceData()];
            common.activateController(promises, 'home');
        }

        function getInitRating(data) {
            that.initRating = that.rating = data.rating;
        }

        function getInitalPlaceData() {
            return placesService.getPlace($routeParams.placeId).then(function(data){
                that.place = data;
                getInitRating(data);
            });
        }
    }

})();