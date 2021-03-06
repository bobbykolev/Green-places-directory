(function() {
    'use strict';

    var app = angular.module('app.about', ['ngSanitize']);

    app.controller('About', About);
    
    About.$inject = ['common', 'config', '$q'];

    function About(common, config, $q) {
        var that = this,
            transTxts = {
                bg: {
                    title:"За Нас",
                    subTitle: "Често задавани въпроси",
                    info: "<p>Списък на веган и 'веган-френдли' ресторанти и сладкарници в България.</p>"
                    + "<p>За обратна връзка и информация за нови или съществуващи заведения, моля използвайте нашият имейл.</p>"
                    + "<p>Може да прегледате секцията ни с въпроси и отговори отдолу.</p>",
                    qAndA: [{
                            question:"Защо включвате вегетариански заведения?",
                            answer:"Включените вегетариански заведения са одобрени и са добър избор за вегани. Голям % от предлаганото в тях е веган. "
                            +"Концептуално отделени от веганизма или подвели по един или друг начин последователите си няма да бъдат включвани или съответно ще бъдат изключени (пример Ванила Китчън)."
                        },
                        {
                            question:"Включвате ли заведения, в които се сервира месо дори и да предлагат веган храна?",
                            answer:"Не!"
                        },
                        {
                            question:"Какво представлява веган рейтинга?",
                            answer:"Kъм момента рейтингът се формира така: голям процент ястия с млечни продукти - 1; много малък процент от менюто с млечни продукти - 2; използване на мед - 3; изцяло веган - 4;"
                        }
                    ]
                },
                en: {
                    title:"About",
                    subTitle: "FAQ",
                    info: "<p>Vegan-places.com offers information about vegan and vegan-friendly restaurants and bakeries in Bulgaria.</p>"
                        + "<p>Please send your questions, feedback or information about new or existing vegan places to our email.</p>"
                        + "<p>You can check our Q&A section below.</p>",
                        qAndA: [{
                            question:"There are vegetarian places listed, why?",
                            answer:"The vegetarian restaurants included have been approved and are a good choice for vegans. Big percentage of the meals they offer are vegan. "
                                + "Conceptually separated from veganism or misleading in one way or another their followers will not be included or will consequently be excluded (eg. Vanilla Kitchen)."
                        },
                        {
                            question:"Are you going to include places that offer meat even if they offer vegan meals?",
                            answer:"No!"
                        },
                        {
                            question:"What is 'vegan rating'?",
                            answer:"The rating is formed as: big percent of diary meals - 1; few diary meals on the menu - 2; using honey - 3; fully vegan - 4;"
                        }
                    ]
                }
            };

        that.title = transTxts[config.lang].title;
        that.subTitle = transTxts[config.lang].subTitle;
        that.email = 'veganplaces@the-vegan.org';
        that.infoTxt = transTxts[config.lang].info;
        that.qAndA = transTxts[config.lang].qAndA;

        activate();

        function activate() {
            common.activateController([falsePromise()], 'about');
            common.scrollTop();
        }

        function falsePromise() {
            return $q.when(true);
        }
    }

})();