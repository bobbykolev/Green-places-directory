(function() {
	'use strict';

	angular.module('app')
        .controller('Nav', Nav);

	Nav.$inject = ['$route', '$window', 'config', 'routes'];

	function Nav($route, $window, config, routes) {
		var that = this;

        that.collapsed = false;

        that.langs = ['en','bg'];//todo:config
        that.activeLang = config.lang;

        that.isCurrent = isCurrent;
        that.chooseLang = chooseLang;

        that.logoTitle = config.lang == 'en' ? 'Home':'Начало';

        activate();

        function activate() {
            getNavRoutes();
        }

        function chooseLang(lang) {
            if (lang == that.activeLang) {
                return;
            } else {
                config.setLang(lang);
                $window.location.reload();
            }
        }
        
        function getNavRoutes() {
            that.navRoutes = routes.filter(function(r) {
                return r.config.settings && r.config.settings.nav;
            }).sort(function(r1, r2) {
                return r1.config.settings.nav - r2.config.settings.nav;
            });
        }
        
        function isCurrent(route) {
            if (!route.config.title || !$route.current || !$route.current.title) {
                return '';
            }
            
            var menuName = route.config.title;
            return $route.current.title.match(menuName) ? 'active' : '';
        }
	}

})();