(function() {
    'use strict';

    var app = angular.module('app');

    app.controller('Home', Home);
    Home.$inject = ['common', 'places', '$scope'];

    function Home(common, places, $scope) {
        var that = this,
            warningFiltersTxt = '* Filters applied, some of the content could be hidden.';

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

        /*that.toggleInfo = function($event) {
            var el = $($event.currentTarget);
            el.find('i').toggleClass('fa-angle-double-down').toggleClass('fa-angle-double-up');
            el.next().slideToggle();
        };*/

        activate();

        function activate() {
            var promises = [getPlaces(), getTowns()];
            common.activateController(promises, 'home');

            getCurentTownFilter();
            getCurentTypeFilter();


        }

        function getPlaces() {
            return places.getPlaces().then(function(data) {
                setOpenCloseMarker(data);
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
                //–   8211    2013    &ndash; EN DASH
               startEndTimeArr = data[i].workingTime[currentDay-1].split('–');

                if (startEndTimeArr[0]) {
                    startTime = startEndTimeArr[0].split(':');
                    endTime = startEndTimeArr[1].split(':');

                    //houers '-2': data is with GMT -2 (Sofia...)
                    if ((currentHour > parseInt(startTime[0]) - 2) && (currentHour < parseInt(endTime[0]) - 2)) {
                        data[i].isOpen = true;
                    } else if ((currentHour == parseInt(startTime[0]) - 2)  && (currentMinutes > parseInt(startTime[1]))) {
                        data[i].isOpen = true;
                    }  else if ((currentHour == parseInt(endTime[0]) - 2)  && (currentMinutes < parseInt(endTime[1]))) {
                        data[i].isOpen = true;
                    } else {
                        data[i].isOpen = false;
                    }
                } else {
                    data[i].isOpen = false;
                }
            }
        }
    }

})();