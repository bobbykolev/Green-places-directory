(function () {
    'use strict';

    angular.module('app')
        .factory('placesService', places);

    places.$inject = ['$http', '$cacheFactory', '$timeout', 'common', 'config'];

    function places($http, $cacheFactory, $timeout, common, config) {
        var $q = common.$q,
            cache = $cacheFactory('places-cache'),
            reset,//timeout, resets cahce
            resetTime = 180000,
            markerCheck;

        var service = {
            getPlaces: getPlaces,
            getPlace: getPlace
        };

        return service;

        function getPlaces() {
            var def = $q.defer();

            if (cache.get('places_' + config.lang)) {
                def.resolve(cache.get('places_' + config.lang));
            } else {
                $http.get('./places_min_' + config.lang + '.json?v='+(new Date()).getTime()).success(function(places) {
                    places = common.setOpenCloseMarker(places);
                    
                    cache.put('places_' + config.lang, places);
                    startResetCacheTimeout();
                    def.resolve(places);
                });
            }

            return def.promise;
        }

        function getPlace(id) {
            var def = $q.defer();

            if (cache.get('places_' + config.lang)) {
                def.resolve(getPlaceById(cache.get('places_' + config.lang), id));
            } else {
                $http.get('./places_min_' + config.lang + '.json?v='+(new Date()).getTime()).success(function(places) { 
                    places = common.setOpenCloseMarker(places);

                    cache.put('places_' + config.lang, places);
                    startResetCacheTimeout();
                    def.resolve(getPlaceById(places, id));
                });
            }

            return def.promise;
        }

        function getPlaceById(places, id) {
            for (var i = 0; i < places.length; i++) {
                if(places[i].id == id) {
                     return places[i];
                }
            }

            return null;
        }

        function startResetCacheTimeout() {
            reset && $timeout.cancel(reset);
            reset = $timeout(function(){
                console.log("[VP] reset places cache", new Date());
                cache.removeAll();
            }, resetTime);
        }
    }
})();