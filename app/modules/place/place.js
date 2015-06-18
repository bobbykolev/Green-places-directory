(function() {
    'use strict';

    var app = angular.module('app.place', []);

    app.controller('Place', Place);

    Place.$inject = ['$routeParams', '$scope', 'config', 'common', 'placesService'];

    function Place($routeParams, $scope, config, common, placesService) {
        var that = this,
            transTxts = {
                bg: {
                    days:["Понеделник", "Вторник", "Сряда", "Четвъртък", "Петък", "Събота", "Неделя"],
                    rest: "Почивен ден;"
                },
                en: {
                    days:["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                    rest: "Rest day;"
                }
            };

        that.days = transTxts[config.lang].days;
        that.lang = config.lang;
        that.place = {};
        that.rating = 5;
        that.warning = [''];

        $scope.rateFunction = function(rating) {
            alert("Rating selected - " + rating);
        };

        that.userFriendlyUrl = function(url) {
            return url.replace(/http:\/\//gi, '').replace(/https:\/\//gi, '');
        };

        that.getTime = function(day, time) {
            return '<strong>'+day +'</strong>: ' + (time ? time + ';' : transTxts[config.lang].rest);
        };
        
        $scope.$watch(
            "that.rating",
            function(newValue, oldValue) {

            }
        );

        activate();

        function activate() {
            var promises = [getInitalPlaceData()];
            common.activateController(promises, 'place');
            common.scrollTop();
        }

        function getInitalPlaceData() {
            return placesService.getPlace($routeParams.placeId).then(function(data){
                that.place = data || {};
                that.rating = data.rating || 5;
                that.warning = data.warning || [''];
            });
        }
    }

})();