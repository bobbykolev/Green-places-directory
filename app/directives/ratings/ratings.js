(function() {
    'use strict';

    angular.module('app.directives')
        .directive("starRatings", starRatings);

    function starRatings() {
        var directive = {
            link: link,
            restrict: 'A',
            transclude: true,
            templateUrl: 'app/directives/ratings/ratings.html',
            scope: {
                ratingValue: "=",
                max: "=",
                onRatingSelected: "&"
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
                    rating: index + 1
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