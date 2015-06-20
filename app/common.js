(function(){
'use strict';

    var commonModule = angular.module('common', []);

    // Must configure the common service and set its 
    // events via the commonConfigProvider
    commonModule.provider('commonConfig', function () {
        this.config = {
            // These are the properties we need to set
            //controllerActivateSuccessEvent: '',
            //spinnerToggleEvent: ''
        };

        this.$get = function () {
            return {
                config: this.config
            };
        };
    });

    commonModule.factory('common', common);
    
    common.$inject = ['$q', '$rootScope', 'commonConfig', '$interval', 'config'];

    function common($q, $rootScope, commonConfig, $interval, config) {
		var service = {
            // common angular dependencies
            $broadcast: $broadcast,
            $q: $q,
            getUnique: getUnique,
            // generic
            activateController: activateController,
            getUniqueProps: getUniqueProps,
            trimName: trimName,
            scrollTop:scrollTop,
            setOpenCloseMarker:setOpenCloseMarker,
            setOpenCloseUpdater:setOpenCloseUpdater,
            sortByProp:sortByProp,
            setLoading:setLoading
        },
        timeZoneGap = config.timeZoneGap,
        markerCheck,
        openCloseUpdateTime = 600000;//10min

        return service;

		function activateController(promises, controllerId) {
			return $q.all(promises).then(function (eventArgs) {
				var data = { controllerId: controllerId };
				$broadcast(commonConfig.config.controllerActivateSuccessEvent, data);
			});
		}

		function $broadcast() {
			return $rootScope.$broadcast.apply($rootScope, arguments);
		}

		function getUnique(arr) {
			var u = {}, uniqueArray = [];

			for(var i = 0, l = arr.length; i < l; ++i){
				if(u.hasOwnProperty(arr[i])) {
					continue;
				}

				uniqueArray.push(arr[i]);
				u[arr[i]] = 1;
			}

			return uniqueArray;
		}

        function getUniqueProps(prop, data) {
            var arr = [];
            for (var i = 0; i < data.length; i++) {
                var t = data[i][prop].split(',');
                for (var j = 0; j < t.length; j++) {
                    arr.push(t[j]);
                }
            }

            return getUnique(arr);
        }

        function trimName(name, len) {
            if (name.length > (len || 30)) {
                name = name.split(' ');
                name.pop();
                name = name.join(' ');
            }

            return name;
        }

        function scrollTop(val) {
            document.getElementsByTagName('body')[0].scrollTop = (val || 0);
        }

        function setOpenCloseMarker(data) {
            var arr = [],
                startEndTimeArr = [],
                today = new Date(),
                currentDay = today.getDay(),
                currentHour = today.getUTCHours(),
                currentMinutes = today.getMinutes(),
                startTime,
                endTime;

                if (currentDay == 0) {
                    currentDay = 7;
                }

            for (var i = 0; i < data.length; i++) {
                //the dash: (– 8211  2013 &ndash; EN DASH)
               startEndTimeArr = data[i].workingTime[currentDay-1].split('–');

                if (startEndTimeArr[0]) {
                    startTime = startEndTimeArr[0].split(':');
                    endTime = startEndTimeArr[1].split(':');

                    //hours '-2': data is with GMT -2 (Sofia...)
                    if ((currentHour > parseInt(startTime[0]) - timeZoneGap) && (currentHour < parseInt(endTime[0]) - timeZoneGap)) {
                        data[i].isOpen = true;
                    } else if ((currentHour == parseInt(startTime[0]) - timeZoneGap)  && (currentMinutes > parseInt(startTime[1]))) {
                        data[i].isOpen = true;
                    }  else if ((currentHour == parseInt(endTime[0]) - timeZoneGap)  && (currentMinutes < parseInt(endTime[1]))) {
                        data[i].isOpen = true;
                    } else {
                        data[i].isOpen = false;
                    }
                } else {
                    data[i].isOpen = false;
                }
            }

            return data;
        }

        function setOpenCloseUpdater (places) {
            markerCheck && $interval.cancel(markerCheck);
            markerCheck = $interval(function(){
                console.log("[VP] open/close marker refresh", new Date());
                setOpenCloseMarker(places);
            }, openCloseUpdateTime);
        }

        function sortByProp(array, prop) {
            array.sort(function (a, b) {
                if (a[prop] > b[prop]) {
                return 1;
                }
                if (a[prop] < b[prop]) {
                return -1;
                }
                return 0;
            });

            return array;
        }
	}

    function setLoading(on) {
        console.log('show: ',on);
        on ? $('.page-splash').show() : $('.page-splash').hide();
    }
})();