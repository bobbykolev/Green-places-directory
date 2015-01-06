(function () {
    'use strict';

    angular.module('app').factory('places', places);
    places.$inject = ['$http', 'common'];

    function places($http, common) {
        var $q = common.$q;
        //temp
        var places = [{"id":0,"rating":0,"imageUrl":"","description":"","latitude":"","longitude":"","name":"Vegan Kitsch","workingTime":{"mon":"","tus":"","wed":"","thu":"","fri":"","sat":"","sun":""},"city":"Sofia","address":"str. 'Parchevich' 42"},{"id":1,"rating":0,"imageUrl":"","description":"","latitude":"","longitude":"","name":"Kring","workingTime":{"mon":"","tus":"","wed":"","thu":"","fri":"","sat":"","sun":""},"city":"Sofia","address":"str. 'Parchevich' 42"},{"id":2,"rating":0,"imageUrl":"","description":"","latitude":"","longitude":"","name":"Sladkishnica","workingTime":{"mon":"","tus":"","wed":"","thu":"","fri":"","sat":"","sun":""},"city":"Sofia","address":"str. 'Parchevich' 42"},{"id":3,"rating":0,"imageUrl":"","description":"","latitude":"","longitude":"","name":"VegAnica","workingTime":{"mon":"","tus":"","wed":"","thu":"","fri":"","sat":"","sun":""},"city":"Varna, Plovdiv","address":"str. 'Parchevich' 42"},{"id":4,"rating":0,"imageUrl":"","description":"","latitude":"","longitude":"","name":"Hatori","workingTime":{"mon":"","tus":"","wed":"","thu":"","fri":"","sat":"","sun":""},"city":"Varna","address":"str. 'Car Asen' 53"},{"id":5,"rating":0,"imageUrl":"","description":"","latitude":"","longitude":"","name":"Sun Moon","workingTime":{"mon":"","tus":"","wed":"","thu":"","fri":"","sat":"","sun":""},"city":"Sofia","address":"str. 'Car Asen' 53"},{"id":6,"rating":0,"imageUrl":"","description":"","latitude":"","longitude":"","name":"Sun Moon 2","workingTime":{"mon":"","tus":"","wed":"","thu":"","fri":"","sat":"","sun":""},"city":"Sofia","address":"str. 'Car Asen' 53"},{"id":7,"rating":0,"imageUrl":"","description":"","latitude":"","longitude":"","name":"Soul Kitchen","workingTime":{"mon":"","tus":"","wed":"","thu":"","fri":"","sat":"","sun":""},"city":"Sofia","address":"str. 'Car Asen' 53"},{"id":8,"rating":0,"imageUrl":"","description":"","latitude":"","longitude":"","name":"Dream House","workingTime":{"mon":"","tus":"","wed":"","thu":"","fri":"","sat":"","sun":""},"city":"Sofia","address":"str. 'Alabin'"}];

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