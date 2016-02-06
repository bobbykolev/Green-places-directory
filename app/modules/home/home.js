(function() {
    'use strict';

    var app = angular.module('app.home', []);

    app.controller('Home', Home);

    Home.$inject = ['$scope', 'config', 'common', 'placesService'];

    function Home($scope, config, common, placesService) {
        var that = this,
            transTxts = {
                bg: {
                    title:"Веган Заведения в България",
                    warningFiltersTxt:"* Активирани филтри, възможно е част от съдържанието да е скрито!",
                    warningTxt2: "* забележка: не всички заведения приемат, че пчелният мед не е 'веган'",
                    warningTxt3: "* забележка: във всички изброени вегетариански заведения има веган ястия",
                    warningTxt4: "* забележка: всяко заведение има право да не спазва оказаното раобтно време",
                    allTxt:"Всички",
                    clearFiltersTxt: "изчисти филтрите",
                    searchTxt: "Търси (пример 'пица')",
                    openTxt:"Отворено",
                    closedTxt:"Затворено",
                    orders: ["Веган Рейтинг","Дата на добавяне"]
                },
                en: {
                    title:"Vegan Places In Bulgaria",
                    warningFiltersTxt:"* Filters applied, some of the content could be hidden!",
                    warningTxt2: "* note: not all vegan places consider honey as 'not vegan'",
                    warningTxt3: "* note: there's vegan food in all vegetarian places",
                    warningTxt4: "* note: all places have the right to not comply with the provided working time",
                    allTxt:"All",
                    clearFiltersTxt: "clear filters",
                    searchTxt: "Search (e.g. pizza)",
                    openTxt:"Open",
                    closedTxt:"Closed",
                    orders: ["Vegan Priority","Date Added"]
                }
            };

        that.title = transTxts[config.lang].title;
        that.warningTxt = '';
        that.warningTxt2 = transTxts[config.lang].warningTxt2;
        that.warningTxt3 = transTxts[config.lang].warningTxt3;
        that.warningTxt4 = transTxts[config.lang].warningTxt4;
        that.allTxt = transTxts[config.lang].allTxt;
        that.clearFiltersTxt = transTxts[config.lang].clearFiltersTxt;
        that.searchTxt = transTxts[config.lang].searchTxt;
        this.openTxt = transTxts[config.lang].openTxt;
        this.closedTxt = transTxts[config.lang].closedTxt;
        that.orderOps = [{id:0,name: transTxts[config.lang].orders[0], value:'priority', asc: false},
                        {id:1,name: transTxts[config.lang].orders[1], value:'id', asc: true}];
        that.order = that.orderOps[0];

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
            common.activateController([getInitalPlacesData()], 'home');

            getCurentTownFilter();
            getCurentTypeFilter();

            common.scrollTop();
        }

        function getTowns(data) {
            that.towns = common.getUniqueProps('town', data);
        }

        function getVtypes(data) {
            that.vTypes = common.getUniqueProps('vType', data);
        }

        function getInitalPlacesData() {
            return placesService.getPlaces().then(function(data) {
                that.places = data;
                common.setOpenCloseUpdater(that.places);

                getTowns(data);
                getVtypes(data);
            });
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
    }
})();