(function() {
    'use strict';

    var app = angular.module('app');

    app.controller('Contact', Contact);
    Contact.$inject = ['common'];

    function Contact(common) {
        var that = this;

        that.contactTitle = 'Contact';

        activate();

        function activate() {
            common.activateController([], 'contact');
        }
    }

})();