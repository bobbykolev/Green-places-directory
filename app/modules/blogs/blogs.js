(function() {
    'use strict';

    var app = angular.module('app');

    app.controller('Blogs', Blogs);
    Blogs.$inject = ['common'];

    function Blogs(common) {
        var that = this;

        that.blogTitle = 'Blogs';

        activate();

        function activate() {
            common.activateController([], 'blogs');
        }
    }

})();