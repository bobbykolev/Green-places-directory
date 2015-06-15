(function() {
    'use strict';

    angular.module('app.directives')
        .directive('mgmaps', mgmaps);

    mgmaps.$inject = ['$window', 'common', 'config'];

    function mgmaps($window, common, config) {
        var $q = common.$q,
            lat = '42.694600',
            lon = '23.322000',
            zoomLevel = setZoom(),
            mgMap,
            text = {
                bg: "--Избери--",
                en: "--Choose--"
            };

        var directive = {
            link: link,
            restrict: 'A',
            transclude: true,
            templateUrl: 'app/directives/mgmap/mgmap.html',
            scope: {
                'places': '=',
                'lang':'=',
                'markertxt': '='
            }
        };

        return directive;

        function link(scope, element, attrs) {
            resizeMap(element);

            scope.selectTxt = text[config.lang];
            scope.$watch('mgmaps', function(data) {
                setPlacePosition(data);
            });
            scope.trimName = function (name) {
                var trimmed = name;

                if (name.length > 30) {
                    trimmed = name.split(' ');
                    trimmed.splice(-1, 1);
                    trimmed = trimmed.join(' ');
                }

                return trimmed;  
            };

            if ($window.google && $window.google.maps) {
                scope.$watch('places', function(collection) {
                    setMap(scope, element, attrs);
                    addBtnListeners(element, scope);
                });
            } else {
                loaded(scope).then(function() {
                    scope.$watch('places', function(collection) {
                        setMap(scope, element, attrs);
                        addBtnListeners(element, scope);
                    });
                });
            }
        }

        function setUserPosition(scope, element) {
            if(navigator && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position){
                    if (position) {
                        disableGetLocationBtn(element);

                        var marker = new google.maps.Marker({
                            position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                            map: mgMap,
                            title: scope.markertxt
                        });

                        mgMap.panTo(marker.getPosition());
                    }
                });
            }
        }

        function setPlacePosition(place) {
            if (place && place.latitude) {
                mgMap.panTo(new google.maps.LatLng(place.latitude, place.longitude));
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

                mgMap = new google.maps.Map(element[0].childNodes[0], mapOptions);

                for (var i = 0; i < scope.places.length; i++) {
                    var latLng = new google.maps.LatLng(scope.places[i].latitude, scope.places[i].longitude);
                    var marker = new google.maps.Marker({
                        position: latLng,
                        map: mgMap,
                        title: scope.places[i].name,
                        icon: './img/vp_logo'+scope.places[i].priority+'.png' }
                    );

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
                            +'<div>Vegan rating: <strong>'+ (5 - place.priority) + ' <span style="font-size:10px;font-weight:normal;">(1-4)</span></strong></div>'
                        + '</div>',
                disableAutoPan: true,
                zIndex: (5 - place.priority)
            });
            
            google.maps.event.addListener(marker, 'click', function () {
                infowindow.open(map, marker);
                map.panTo(marker.getPosition());
            });
        }

        function addBtnListeners(element, scope) {
            var btn = element[0].childNodes[4];

            function cleanSetUserPosition(e) {
                //use for one time click only
                //e.currentTarget.removeEventListener(e.type, arguments.callee);
                setUserPosition(scope, element);
            }

            btn.removeEventListener('click',cleanSetUserPosition);
            btn.addEventListener('click', cleanSetUserPosition);
        }

        function disableGetLocationBtn(element) {
            element[0].childNodes[4].className = element[0].childNodes[4].className.replace(/\bactive\b/, '');  
        }

        function resizeMap(element) {
            var windowHeight = window.innerHeight,
                headHeight = 50 + 55;

            element[0].childNodes[0].style.height = (windowHeight-headHeight) + 'px';
        }

        function setZoom() {
            var w = window.innerWidth;
            return w < 500 ? 14 : 15;
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