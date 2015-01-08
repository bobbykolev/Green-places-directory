(function () {
    'use strict';

    angular.module('app').factory('places', places);
    places.$inject = ['$http', 'common'];

    function places($http, common) {
        var $q = common.$q;
        //temp
        var places = [{"id":0,"rating":0,"phone":[],"imageUrl":"","links":[],"description":"","latitude":"","longitude":"","name":"Vegan Kitsch","workingTime":["","","","","","",""],"city":"Sofia","address":"str. 'Parchevich' 42"},{"id":1,"rating":0,"phone":["02/9834333","0878 577 597"],"imageUrl":"http://the-vegan.org/wp-content/uploads/2014/04/905515_10151550712942446_1020992298_o.jpg","links":["http://kring.bg/","https://www.facebook.com/KringFan"],"description":"Healthy food restaurant, with vegetarian and vegan (mostly) meals. Specialties - meals with tempeh and seitan, vegan doner kebab/Shawarma, tacos, cakes, muffins and more...","latitude":"42.701085","longitude":"23.324769","name":"Kring","workingTime":["11:00–21:00","11:00–21:00","11:00–17:00","11:00–21:00","11:00–21:00","12:00–21:00",""],"city":"Sofia","address":"str. 'Car Simeon' 72"},{"id":2,"rating":0,"phone":[],"imageUrl":"","links":[],"description":"","latitude":"","longitude":"","name":"Sladkishnica","workingTime":["","","","","","",""],"city":"Sofia","address":"str. 'Parchevich' 42"},{"id":3,"rating":0,"phone":[],"imageUrl":"","links":[],"description":"","latitude":"","longitude":"","name":"VegAnica","workingTime":["","","","","","",""],"city":"Varna, Plovdiv","address":"str. 'Parchevich' 42"},{"id":4,"rating":0,"phone":[],"imageUrl":"","links":[],"description":"","latitude":"","longitude":"","name":"Hatori","workingTime":["","","","","","",""],"city":"Varna","address":"str. 'Car Asen' 53"},{"id":5,"rating":0,"phone":[],"imageUrl":"","links":[],"description":"","latitude":"","longitude":"","name":"Sun Moon","workingTime":["","","","","","",""],"city":"Sofia","address":"str. 'Car Asen' 53"},{"id":6,"rating":0,"phone":[],"imageUrl":"","links":[],"description":"","latitude":"","longitude":"","name":"Sun Moon 2","workingTime":["","","","","","",""],"city":"Sofia","address":"str. 'Car Asen' 53"},{"id":7,"rating":0,"phone":[],"imageUrl":"","links":[],"description":"","latitude":"","longitude":"","name":"Soul Kitchen","workingTime":["","","","","","",""],"city":"Sofia","address":"str. 'Car Asen' 53"},{"id":8,"rating":0,"phone":[],"imageUrl":"","links":[],"description":"","latitude":"","longitude":"","name":"Dream House","workingTime":["","","","","","",""],"city":"Sofia","address":"str. 'Alabin'"}];

        var service = {
            getPlaces: getPlaces,
            getPlace: getPlace,
            getMessageCount: getMessageCount
        };

        return service;

        function getMessageCount() { return $q.when(72); }

        function getPlaces() {
            //$http.get('../../places.json').success(function(places) {
              return $q.when(places);
            //});
        }

        function getPlace(id) {
            //$http.get('./places.json').success(function(places) {
                for (var i = 0; i < places.length; i++) {
                    if(places[i].id == id) {
                        return $q.when(places[i]);
                    }
                }
                
                return $q.when(null);
            //});
        }
    }
})();