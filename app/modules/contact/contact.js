(function() {
    'use strict';

    var app = angular.module('app.contact', []);

    app.controller('Contact', Contact);
    
    Contact.$inject = ['common', 'config'];

    function Contact(common, config) {
        var that = this,
            transTxts = {
                bg: {
                    title:"Контакт"
                },
                en: {
                    title:"Contact"
                }
            };

        that.title = transTxts[config.lang].title;
        that.email = 'admin@the-vegan.org';

        activate();

        function activate() {
            common.activateController([], 'contact');
        }
    }

})();