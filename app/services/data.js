(function () {
    'use strict';

    angular.module('app').factory('places', places);
    places.$inject = ['common'];

    function places(common) {
        var $q = common.$q;

        var service = {
            getPlaces: getPlaces,
            getMessageCount: getMessageCount
        };

        return service;

        function getMessageCount() { return $q.when(72); }

        function getPlaces() {
            var places = [
                {
                    name: 'Vegan Kitsch',
                    workingTime: { mon: "", tus: "", wed: "", thu: "", fri: "", sat: "", sun: ""},
                    city: 'Sofia',
                    address: 'str. \'Parchevich\' 42'
                },
                {
                    name: 'Kring',
                    workingTime: { mon: "", tus: "", wed: "", thu: "", fri: "", sat: "", sun: ""},
                    city: 'Sofia',
                    address: 'str. \'Parchevich\' 42'
                },
                {
                    name: 'Sladkishnica',
                    workingTime: { mon: "", tus: "", wed: "", thu: "", fri: "", sat: "", sun: ""},
                    city: 'Sofia',
                    address: 'str. \'Parchevich\' 42'
                },
                {
                    name: 'VegAnica',
                    workingTime: { mon: "", tus: "", wed: "", thu: "", fri: "", sat: "", sun: ""},
                    city: 'Varna, Plovdiv',
                    address: 'str. \'Parchevich\' 42'
                },
                {
                    name: 'Hatori',
                    workingTime: { mon: "", tus: "", wed: "", thu: "", fri: "", sat: "", sun: ""},
                    city: 'Varna',
                    address: 'str. \'Car Asen\' 53'
                },
                {
                    name: 'Sun Moon',
                    workingTime: { mon: "", tus: "", wed: "", thu: "", fri: "", sat: "", sun: ""},
                    city: 'Sofia',
                    address: 'str. \'Car Asen\' 53'
                },
                {
                    name: 'Sun Moon 2',
                    workingTime: { mon: "", tus: "", wed: "", thu: "", fri: "", sat: "", sun: ""},
                    city: 'Sofia',
                    address: 'str. \'Car Asen\' 53'
                },
                {
                    name: 'Soul Kitchen',
                    workingTime: { mon: "", tus: "", wed: "", thu: "", fri: "", sat: "", sun: ""},
                    city: 'Sofia',
                    address: 'str. \'Car Asen\' 53'
                },
                {
                    name: 'Dream House',
                    workingTime: { mon: "", tus: "", wed: "", thu: "", fri: "", sat: "", sun: ""},
                    city: 'Sofia',
                    address: 'str. \'Alabin\''
                }
            ];
            return $q.when(places);
        }
    }
})();