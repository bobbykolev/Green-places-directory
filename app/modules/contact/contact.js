(function() {
    'use strict';

    var app = angular.module('app');

    app.controller('Contact', Contact);
    Contact.$inject = ['common'];

    function Contact(common) {
        var that = this;

        that.contactTitle = 'Contact';
        that.email = 'admin@the-vegan.org';

        activate();

        function activate() {
            common.activateController([], 'contact');
        }
    }

})();