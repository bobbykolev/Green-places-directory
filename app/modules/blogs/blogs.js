(function() {
    'use strict';

    var app = angular.module('app.blogs', []);

    app.controller('Blogs', Blogs);
    
    Blogs.$inject = ['common', 'config'];

    function Blogs(common, config) {
        var that = this,
            transTxts = {
                bg: {
                    title:"Блогове"
                },
                en: {
                    title:"Blogs"
                }
            };

        that.title = transTxts[config.lang].title;

        activate();

        function activate() {
            common.activateController([], 'blogs');
        }
    }

})();