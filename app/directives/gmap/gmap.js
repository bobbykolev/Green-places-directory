(function() {
    'use strict';

    angular.module('app.directives')
        .directive('gmaps', gmaps);

    gmaps.$inject = ['$window', 'common'];

    function gmaps($window, common) {
        var $q = common.$q;

        var directive = {
            link: link,
            restrict: 'A',
            scope: {
                'place': '=',
                'lang': '=',
                'lat': '=',
                'lon': '='
            }
        };

        return directive;

        function link(scope, element, attrs) {
            if ($window.google && $window.google.maps) {
                scope.$watch('place', function(collection) {
                    setMap(scope, element, attrs);
                });
            } else {
                loaded(scope).then(function() {
                    scope.$watch('place', function(collection) {
                        setMap(scope, element, attrs);
                    });
                });
            }
        }

        function setMap(scope, element, attrs) {
            if (scope.lat && scope.lon) {
                var myLatlng = new google.maps.LatLng(scope.lat, scope.lon);
                var mapOptions = {
                    zoom: 18,
                    center: myLatlng,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                var map = new google.maps.Map(document.getElementById(attrs.id), mapOptions);

                var marker = new google.maps.Marker({
                    position: myLatlng,
                    map: map,
                    title: scope.place.name,
                    icon: './img/vp_logo.png'
                });
            }
        }

        function loaded(scope) {
            var deferred = $q.defer();

            $window.initgmap = function() {
                deferred.resolve();
            };

            var scr = document.createElement('script');
            scr.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBLcswVGL0abhNN_vCnOH14LG7buvp-0VA&v=3.exp&callback=initgmap&language=' + scope.lang;
            document.body.appendChild(scr);

            return deferred.promise;
        }
    }
})();