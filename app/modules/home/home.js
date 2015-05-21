(function() {
    'use strict';

    var app = angular.module('app.home', []);

    app.controller('Home', Home);

    Home.$inject = ['$scope', '$interval', 'config', 'common', 'placesService'];

    function Home($scope, $interval, config, common, placesService) {
        var that = this,
            timeZoneGap = config.timeZoneGap,
            transTxts = {
                bg: {
                    title:"Веган Заведения в България",
                    warningFiltersTxt:"* Активирани филтри, възможно е част от съдържанието да е скрито.",
                    warningTxt2: "* забележка: не всички заведения приемат пчелния мед за 'веган'",
                    warningTxt3: "* забележка: във всички изброени вегетариански заведения има веган ястия. Някои от заведенията са 99% веган.",
                    allTxt:"Всички",
                    clearFiltersTxt: "изчисти филтрите",
                    searchTxt: "Търси по дума...",
                    openTxt:"Отворено",
                    closedTxt:"Затворено"
                },
                en: {
                    title:"Vegan Places In Bulgaria",
                    warningFiltersTxt:"* Filters applied, some of the content could be hidden.",
                    warningTxt2: "* note: not all vegan places consider honey as 'vegan'",
                    warningTxt3: "* note: There's vegan food in all vegetarian places, some of them are 98% vegan.",
                    allTxt:"All",
                    clearFiltersTxt: "clear filters",
                    searchTxt: "Search by keyword...",
                    openTxt:"Open",
                    closedTxt:"Closed"
                }
            },
            markerCheck;

        that.title = transTxts[config.lang].title;
        that.warningTxt = '';
        that.warningTxt2 = transTxts[config.lang].warningTxt2;
        that.warningTxt3 = transTxts[config.lang].warningTxt3;
        that.allTxt = transTxts[config.lang].allTxt;
        that.clearFiltersTxt = transTxts[config.lang].clearFiltersTxt;
        that.searchTxt = transTxts[config.lang].searchTxt;
        this.openTxt = transTxts[config.lang].openTxt;
        this.closedTxt = transTxts[config.lang].closedTxt;

        that.places = [];

        that.towns = [];
        that.town = '';

        that.vTypes = [];
        that.vType = '';

        that.mealTypes = ["-sweetShop-", "-restaurant-", "-store-", "-fastFood-"];

        activate();

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

        function activate() {
            var promises = [getInitalPlacesData()];
            common.activateController(promises, 'home');

            getCurentTownFilter();
            getCurentTypeFilter();

            setOpenCloseUpdater();
        }

        function setOpenCloseUpdater () {
            markerCheck && $interval.cancel(markerCheck);
            markerCheck = $interval(function(){
                console.log("[VP] open/close marker refresh", new Date());
                setOpenCloseMarker(that.places);
            }, 600000);//10min
        }

        function getTowns(data) {
            that.towns = getUniqueProp('town', data);
        }

        function getVtypes(data) {
            that.vTypes = getUniqueProp('vType', data);
        }

        function getInitalPlacesData() {
            return placesService.getPlaces().then(function(data) {
                that.places = setOpenCloseMarker(data);
                getTowns(data);
                getVtypes(data);
            });
        }

        function getUniqueProp(prop, data) {
            var arr = [];
            for (var i = 0; i < data.length; i++) {
                var t = data[i][prop].split(',');
                for (var j = 0; j < t.length; j++) {
                    arr.push(t[j]);
                }
            }

            return common.getUnique(arr);
        }


        //todo: different filters on different lang - fix it 
        function getCurentTownFilter(){
            if (localStorage) {
                that.town = localStorage.getItem('currentVplace_' + config.lang) || '';
            }
        }

        function getCurentTypeFilter(){
            if (localStorage) {
                that.vType = localStorage.getItem('currentVtype_' + config.lang) || '';
            }
        }

        function setCurentTownFilterToLS(val){
            saveValToLS('currentVplace_' + config.lang, val);
        }

        function setCurentTypeFilterToLS(val){
            saveValToLS('currentVtype_' + config.lang, val);
        }

        function saveValToLS(key, val) {
            if (localStorage) {
                localStorage.setItem(key, val);
            }
        }

        function checkForActivFiltering() {
            if(that.town || that.vType || $scope.search) {
                that.warningTxt = transTxts[config.lang].warningFiltersTxt;
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
    }

})();