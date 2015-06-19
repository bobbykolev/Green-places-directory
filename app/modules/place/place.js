(function() {
    'use strict';

    var app = angular.module('app.place', []);

    app.controller('Place', Place);

    Place.$inject = ['$routeParams', '$scope', 'config', 'common', 'placesService', '$location'];

    function Place($routeParams, $scope, config, common, placesService, $location) {
        var that = this,
            transTxts = {
                bg: {
                    days:["Понеделник", "Вторник", "Сряда", "Четвъртък", "Петък", "Събота", "Неделя"],
                    rest: "Почивен ден;",
                    rating: "Веган рейтинг: ",
                },
                en: {
                    days:["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                    rest: "Rest day;",
                    rating: "Vegan rating: ",
                }
            };

        that.days = transTxts[config.lang].days;
        that.veganRatingTxt = transTxts[config.lang].rating;
        that.lang = config.lang;
        that.place = {};
        that.rating = 4;
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

        that.swipeLeft = function(e) {
            common.showLoading();
            getNextPlace(that.place.id);
        };

        that.swipeRight = function(e) {
            common.showLoading();
            getPreviusPlace(that.place.id);
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
            common.hideLoading();

            return placesService.getPlace($routeParams.placeId).then(function(data){
                that.place = data || {};
                that.rating = 5 - that.place.priority;
                that.warning = data.warning || [''];
            });
        }

        function getNextPlace(id) {
            placesService.getNext(id).then(function(place){
                $location.path('/places/'+ place.id);
            });
            //todo: get next id and load its page  
        }

        function getPreviusPlace(id) {
            placesService.getPrev(id).then(function(place){
                $location.path('/places/'+ place.id);
            });
            //todo: get previous id and load its page      
        }
    }

})();