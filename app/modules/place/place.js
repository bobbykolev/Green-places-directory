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
                    type: "Тип",
                    dirTxt: "Напътствия"
                },
                en: {
                    days:["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                    rest: "Rest day;",
                    rating: "Vegan rating: ",
                    type: "Type",
                    dirTxt: "Diections"
                }
            };

        that.days = transTxts[config.lang].days;
        that.veganRatingTxt = transTxts[config.lang].rating;
        that.typeTxt = transTxts[config.lang].type;
        that.dirTxt = transTxts[config.lang].dirTxt;
        that.lang = config.lang;
        that.place = {};
        that.rating = 4;
        that.warning = '';
        that.directionsLink = 'https://www.google.com/maps/dir/?api=1&destination=';

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
            if (e && ($(e.target).hasClass('gmap') || $(e.target).parents().hasClass('gmap'))) {
                return true;
            } else {
                common.setLoading(true);
                getNextPlace(that.place.id);
            }
        };

        that.swipeRight = function(e) {
            if (e && ($(e.target).hasClass('gmap') || $(e.target).parents().hasClass('gmap'))) {
                return true;
            } else {
                common.setLoading(true);
                getPreviusPlace(that.place.id);
            }
        };
        
        $scope.$watch(
            "that.rating",
            function(newValue, oldValue) {

            }
        );

        activate();

        function activate() {
            common.activateController([getInitalPlaceData()], 'place');
            common.scrollTop();
        }

        function getInitalPlaceData() {
            return placesService.getPlace($routeParams.placeId).then(function(data){
                that.place = data || {};
                that.rating = 5 - that.place.priority;
                that.warning = data.warning || '';
            });
        }

        function getNextPlace(id) {
            placesService.getNext(id).then(function(place){
                $location.path('/places/'+ place.id);
            });
        }

        function getPreviusPlace(id) {
            placesService.getPrev(id).then(function(place){
                $location.path('/places/'+ place.id);
            });
        }

        function getDirectionLink() {
            if ((navigator.platform.indexOf("iPhone") != -1) || 
             (navigator.platform.indexOf("iPad") != -1) || 
             (navigator.platform.indexOf("iPod") != -1)) {
                return'maps://google.com/maps/dir/?api=1&destination=';
            }

            return 'https://www.google.com/maps/dir/?api=1&destination=';
        }
    }

})();