(function () {
    'use strict';

    angular.module('app')
        .factory('placesService', places);

    places.$inject = ['$http', '$cacheFactory', '$interval', 'common', 'config'];

    function places($http, $cacheFactory, $interval, common, config) {
        var $q = common.$q,
            cache = $cacheFactory('places-cache'),
            reset;//interval, resets cahce

        //var places = [{"id":0,"rating":5,"vType":"-vegan-","phone":["+359878878342"],"imageUrl":"http://vegankitsch.com/images/vegankitschn_site_2.jpg","links":["http://vegankitsch.com/en/","https://www.facebook.com/VeganKitsch"],"description":"'Vegan Kitsch - burgers & raw sweet' offers fresh homemade vegan food - fast food in a new light. Small modern bakery, cafe and known as Kurabiynitsa.","latitude":"42.690588","longitude":"23.320846","name":"Vegan Kitsch","workingTime":["09:00–19:00","09:00–19:00","09:00–19:00","09:00–19:00","09:00–19:00","09:00–19:00",""],"town":"Sofia","address":"str. 'Parchevich' 48"},{"id":1,"rating":5,"vType":"-vegetarian-","phone":["02/9834333","0878 577 597"],"imageUrl":"http://the-vegan.org/wp-content/uploads/2014/04/905515_10151550712942446_1020992298_o.jpg","links":["http://kring.bg/","https://www.facebook.com/KringFan"],"description":"Healthy food restaurant, with vegetarian and vegan (mostly) meals. Specialties - meals with tempeh and seitan, vegan doner kebab/Shawarma, tacos, cakes, muffins and more...","latitude":"42.701085","longitude":"23.324769","name":"Kring","workingTime":["11:00–21:00","11:00–21:00","11:00–17:00","11:00–21:00","11:00–21:00","12:00–21:00",""],"town":"Sofia","address":"str. 'Car Simeon' 72"},{"id":2,"rating":5,"vType":"-vegan-","phone":[],"imageUrl":"","links":[],"description":"","latitude":"","longitude":"","name":"Sladkishnica (Zelen Bio)","workingTime":["","","","","","",""],"town":"Sofia","address":"str. 'Car Ivan Shishman' 43"},{"id":3,"rating":5,"vType":"-vegan-","phone":[],"imageUrl":"","links":[],"description":"","latitude":"","longitude":"","name":"VegAnica","workingTime":["","","","","","",""],"town":"Varna, Plovdiv","address":"str. 'Car Asen I' 54"},{"id":4,"rating":5,"vType":"-vegetarian-","phone":[],"imageUrl":"","links":[],"description":"","latitude":"","longitude":"","name":"Hatori","workingTime":["","","","","","",""],"town":"Varna","address":"str. 'Dragoman ' 9"},{"id":5,"rating":5,"vType":"-vegetarian-","phone":[],"imageUrl":"","links":[],"description":"","latitude":"","longitude":"","name":"Sunmoon","workingTime":["08:30–22:00","08:30–22:00","08:30–22:00","08:30–22:00","08:30–22:00","08:30–22:00","08:30–21:00"],"town":"Sofia","address":"str. '6-ti Septemvri' 39"},{"id":6,"rating":5,"vType":"-vegetarian-","phone":[],"imageUrl":"","links":[],"description":"","latitude":"","longitude":"","name":"Sunmoon 2","workingTime":["","","","","","",""],"town":"Sofia","address":"str. 'W Gladston' 18"},{"id":7,"rating":5,"vType":"-vegan-","phone":[],"imageUrl":"","links":[],"description":"","latitude":"","longitude":"","name":"Soul Kitchen","workingTime":["","","","","","",""],"town":"Sofia","address":"str. 'Kokiche' 13"},{"id":8,"rating":5,"vType":"-vegetarian-","phone":[],"imageUrl":"","links":[],"description":"","latitude":"","longitude":"","name":"Dream House","workingTime":["","","","","","",""],"town":"Sofia","address":"str. 'Alabin' 50A (second floor)"},{"id":9,"rating":5,"vType":"-vegetarian-","phone":[],"imageUrl":"","links":[],"description":"","latitude":"","longitude":"","name":"Soma Vital","workingTime":["","","","","","",""],"town":"Sofia","address":"str. 'Knyaginya Maria Louisa' 58"},{"id":10,"rating":5,"vType":"-vegan-","phone":[],"imageUrl":"","links":[],"description":"","latitude":"","longitude":"","name":"Vanilla Kitchen","workingTime":["","","","","","",""],"town":"Sofia","address":"str. 'Hristo Kovachev' 30"}];

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
                $http.get('./places_min_' + config.lang + '.json').success(function(places) {
                    cache.put('places_' + config.lang, places);
                    startResetCacheInterval();
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
                $http.get('./places_min_' + config.lang + '.json').success(function(places) {
                    cache.put('places_' + config.lang, places);
                    startResetCacheInterval();
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

        function startResetCacheInterval() {
            reset && $interval.cancel(reset);
            reset = $interval(function(){
                console.log("[VP] reset places cache", new Date());
                cache.removeAll();
            }, 500000);
        }
    }
})();