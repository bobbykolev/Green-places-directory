(function() {
    'use strict';
    console.log("fu**");

    var app = angular.module('app');

    app.directive("starRatings", starRatings);

    function starRatings() {
        var directive = {
            link: link,
            restrict: 'A',
            template: "<ul class='rating'>" +
                "  <li ng-repeat='star in stars' ng-class='star' ng-click='toggle($index)'>" +
                "    <i class='fa fa-star'></i>" + //&#9733
            "  </li>" +
                "</ul>",
            scope: {
                ratingValue: "=",
                max: "=",
                onRatingSelected : "&"
            }
        };

        return directive;

        function link(scope, elem, attrs) {
            scope.$watch("ratingValue", function(oldVal, newVal) {
                if (newVal) {
                    updateStars();
                }
            });

            scope.toggle = function(index) {
                scope.ratingValue = index + 1;
                scope.onRatingSelected({
                  rating : index + 1
                });
            };

            var updateStars = function() {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                    scope.stars.push({
                        filled: i < scope.ratingValue
                    });
                }
            };
        }
    }
})();