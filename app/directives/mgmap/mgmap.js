(function() {
    'use strict';

    angular.module('app.directives')
        .directive('mgmaps', mgmaps);

    mgmaps.$inject = ['$window', 'common'];

    function mgmaps($window, common) {
        var $q = common.$q,
            lat = '42.694600',
            lon = '23.322000',
            zoomLevel = setZoom(),
            mgMap;

        var directive = {
            link: link,
            restrict: 'A',
            scope: {
                'places': '=',
                'lang':'=',
                'markertxt': '='
            }
        };

        return directive;

        function link(scope, element, attrs) {
            resizeMap(element);

            if ($window.google && $window.google.maps) {
                scope.$watch('places', function(collection) {
                    setMap(scope, element, attrs);
                    setUserPosition(scope);
                });
            } else {
                loaded(scope).then(function() {
                    scope.$watch('places', function(collection) {
                        setMap(scope, element, attrs);
                        setUserPosition(scope);
                    });
                });
            }
        }

        function setUserPosition(scope) {
            if(navigator && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position){
                    if (position) {
                        lat = position.coords.latitude;
                        lon = position.coords.longitude;

                        var marker = new google.maps.Marker({
                            position: new google.maps.LatLng(lat, lon),
                            map: mgMap,
                            title: scope.markertxt
                        });

                        mgMap.panTo(marker.getPosition());
                    }
                });
            }
        }

        function setMap(scope, element, attrs) {
            if (lat && lon) {
                var myLatlng = new google.maps.LatLng(lat, lon);
                var mapOptions = {
                    zoom: zoomLevel,
                    center: myLatlng,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                mgMap = new google.maps.Map(document.getElementById(attrs.id), mapOptions);

                /*var marker = new google.maps.Marker({
                    position: myLatlng,
                    map: map,
                    title: 'center'
                });*/

                for (var i = 0; i < scope.places.length; i++) {
                    var latLng = new google.maps.LatLng(scope.places[i].latitude, scope.places[i].longitude);
                    var marker = new google.maps.Marker({
                        position: latLng,
                        map: mgMap,
                        title: scope.places[i].name,
                        icon: './img/vp_logo.png' });

                    addMapEventListeners(mgMap, marker, scope.places[i]);
                }
            }
        }

        function addMapEventListeners(map, marker, place) {
            var infowindow = new google.maps.InfoWindow({
                content: '<div>'
                            +'<div>'
                                +'<a style="font-weight:bold;" href="#/places/'+place.id+'">'+place.name+'</a>'
                            +'</div>'
                            +'<div></div>'
                        + '</div>'
            });

            google.maps.event.addListener(marker, 'click', function () {
                infowindow.open(map, marker);
                map.panTo(marker.getPosition());
            });
        }

        function resizeMap(element) {
            var windowHeight = window.innerHeight,
                headHeight = 160;

            element[0].style.height = (windowHeight-headHeight) + 'px';
        }

        function setZoom() {
            var w = window.innerWidth; 
            return w < 500 ? w < 375 ? 13 : 14 : 15;
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