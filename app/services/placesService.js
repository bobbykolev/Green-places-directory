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
                    getTags().then(function(tags){
                        getTypes().then(function(types){
                            places = common.setOpenCloseMarker(places);
                            setPlacesTags(places, tags);
                            setPlacesTypes(places, types);

                            cache.put('places_' + config.lang, places);
                            startResetCacheTimeout();
                            def.resolve(places);
                        });
                    });
                });
            }

            return def.promise;
        }

        function getPlace(id) {
            var def = $q.defer();

            if (cache.get('places_' + config.lang)) {
                def.resolve(getPlaceById(cache.get('places_' + config.lang), id));
            } else {
                getPlaces().then(function (places) {
                    def.resolve(getPlaceById(places, id));
                });
            }

            return def.promise;
        }

        function getTags() {
            var def = $q.defer();

            if (cache.get('tags_' + config.lang)) {
                def.resolve(cache.get('tags_' + config.lang));
            } else {
                $http.get('./places_tags_min_' + config.lang + '.json?v='+(new Date()).getTime()).success(function(tags) { 
                    cache.put('tags_' + config.lang, tags);
                    def.resolve(tags);
                });
            }

            return def.promise;
        }

        function getTypes() {
            var def = $q.defer();

            if (cache.get('types_' + config.lang)) {
                def.resolve(cache.get('types_' + config.lang));
            } else {
                $http.get('./places_types_min_' + config.lang + '.json?v='+(new Date()).getTime()).success(function(types) { 
                    cache.put('types_' + config.lang, types);
                    def.resolve(types);
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

        function setPlacesTags(places, tags) {
            for (var i = 0; i < places.length; i++) {
                for (var j = 0; j < places[i].tags.length; j++) {
                    for (var k = 0; k < tags.length; k++) {
                        if(tags[k].id == places[i].tags[j]) {
                            places[i].tags[j] = tags[k].name;
                        }
                    }
                }
            }
        }

        function setPlacesTypes(places, types) {
            for (var i = 0; i < places.length; i++) {
                for (var j = 0; j < places[i].pType.length; j++) {
                    for (var k = 0; k < types.length; k++) {
                        if(types[k].id == places[i].pType[j]) {
                            places[i].pType[j] = types[k].name;
                        }
                    }
                }
            }
        }
    }
})();