(function() {
    'use strict';

    var app = angular.module('app.map', []);

    app.controller('Map', Map);
    
    Map.$inject = ['common', 'config'];

    function Map(common, config) {
        var that = this,
            transTxts = {
                bg: {
                    title:"Карта"
                },
                en: {
                    title:"Map"
                }
            };

        that.title = transTxts[config.lang].title;

        activate();

        function activate() {
            common.activateController([], 'map');
        }
    }

})();