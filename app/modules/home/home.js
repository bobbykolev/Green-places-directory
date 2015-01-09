(function() {
    'use strict';

    var app = angular.module('app');

    app.controller('Home', Home);
    Home.$inject = ['common', 'places', '$scope'];

    function Home(common, places, $scope) {
        var that = this;
        var warningFiltersTxt = '* Filters applied, some of the content could be hidden.';
        that.places = [];

        that.towns = [];
        that.town = '';

        that.vTypes = ["-vegan-", "-vegetarian-", "-other-"];
        that.vType = '';

        that.homeTitle = 'Places';
        that.warningTxt = '';
        
        //watch and save last selected filters
        $scope.$watch(
            "that.town",
            function(newValue, oldValue) {
                if (newValue != oldValue) {
                    setCurentTownFilterToLS(newValue);
                }

                checkForActivFiltering();
            }
        );

        $scope.$watch(
            "that.vType",
            function(newValue, oldValue) {
                if (newValue != oldValue) {
                    setCurentTypeFilterToLS(newValue);
                }

                checkForActivFiltering();
            }
        );

        $scope.$watch(
            "search",
            function(newValue, oldValue) {
                checkForActivFiltering();
            }
        );

        that.trimed = function(str){
            //todo: refactor, impl capitalize to common 
            var txt = str.replace(/-/gi, '');
            return txt[0].toUpperCase() + txt.slice(1);
        };

        that.clearFilters = function(search) {
            that.town = '';
            that.vType = '';
            setCurentTownFilterToLS('');
            setCurentTypeFilterToLS('');
            $scope.search = '';
            that.warningTxt = '';
        };

        that.toggleInfo = function($event) {
            var el = $($event.currentTarget);
            el.find('i').toggleClass('fa-angle-double-down').toggleClass('fa-angle-double-up');
            el.next().slideToggle();
        };

        activate();

        function activate() {
            var promises = [getPlaces(), getTowns()];
            common.activateController(promises, 'home');

            getCurentTownFilter();
            getCurentTypeFilter();


        }

        function getPlaces() {
            return places.getPlaces().then(function(data) {
                return that.places = data;
            });
        }

        function getTowns() {
            places.getPlaces().then(function(data) {
                that.towns = getUniqueTowns(data);
            });
        }

        function getUniqueTowns(data) {
            var arr = [];
            for (var i = 0; i < data.length; i++) {
                var t = data[i].town.split(',');
                for (var j = 0; j < t.length; j++) {
                    arr.push(t[j]);
                }
            }

            return common.getUnique(arr);
        }

        function getCurentTownFilter(){
            if (localStorage) {
                that.town = localStorage.getItem('currentVplace') || '';
            }
        }

        function getCurentTypeFilter(){
            if (localStorage) {
                that.vType = localStorage.getItem('currentVtype') || '';
            }
        }

        function setCurentTownFilterToLS(val){
            saveValToLS('currentVplace', val);
        }

        function setCurentTypeFilterToLS(val){
            saveValToLS('currentVtype', val);
        }

        function saveValToLS(key, val) {
            if (localStorage) {
                localStorage.setItem(key, val);
            }
        }

        function checkForActivFiltering() {
            if(that.town || that.vType || $scope.search) {
                that.warningTxt = warningFiltersTxt;
            } else {
                that.warningTxt = '';   
            }
        }
    }

})();