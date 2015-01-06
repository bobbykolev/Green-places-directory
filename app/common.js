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
    common.$inject = ['$q', '$rootScope', 'commonConfig' ];

    function common($q, $rootScope, commonConfig) {
		var service = {
            // common angular dependencies
            $broadcast: $broadcast,
            $q: $q,
            getUnique: getUnique,
            // generic
            activateController: activateController
        };

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
	}

})();