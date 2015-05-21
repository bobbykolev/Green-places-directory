(function() {
    'use strict';

    var app = angular.module('app.map', []);

    app.controller('Map', Map);
    
    Map.$inject = ['common', 'config', 'placesService'];

    function Map(common, config, placesService) {
        var that = this,
            transTxts = {
                bg: {
                    title:"Карта",
                    userMarkerTxt: "Вие се намирате тук"
                },
                en: {
                    title:"Map",
                    userMarkerTxt: "You are here"
                }
            };

        that.title = transTxts[config.lang].title;
        that.places = [];
        that.markertxt = transTxts[config.lang].userMarkerTxt;
        that.lang = config.lang;

        activate();

        function activate() {
            common.activateController([getInitalPlacesData()], 'map');
        }

        function getInitalPlacesData() {
            return placesService.getPlaces().then(function(data) {
                that.places = data;
            });
        }
    }

})();