'use strict';

// Declare app level module which depends on views, and components
angular.module('app', [
    'ngRoute'
])

.config(['$routeProvider', function($routeProvider) {
    

    $routeProvider.when('/game', {
            templateUrl: 'templates/game.html',
            controller: 'MyController'
        })
        .otherwise({
            redirectTo: '/game'
        })

}])

.controller('MyController', function($scope, $http) {

    $scope.people = [];
    $scope.color = '';
    $scope.message = '';

    $scope.postData = function() {
        $http.post('/api/v1/postData', {
            color: $scope.color
        }).then(function(response) {
            $scope.message = response.data.message;
        });
        $scope.color = '';
    };

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    var end = 0;
    var gold = 0;
    var health = 100;
    var recoveryCounter = 0;
    var multiplier = 1;
    var merchantCounter = 0;
    var witchCounter = 0;

    var imageDisplay = ['geeblin2spook.png', 'dojogeeblin.png', 'gravesgeeblin.png', 'spacegeeblin.png']; //list of images to pick from
    $scope.getData = function() {
        var imageSelect = getRandomInt(0, 4); //get random value for random image
        $scope.randomimage = imageDisplay[imageSelect]; //show the random image

        recoveryCounter = recoveryCounter + 1; //turns till hp recover
        merchantCounter = merchantCounter + 1; //turns till merchant
        witchCounter = witchCounter + 1; //turns till witch
        //recovery
        if (recoveryCounter == 2 && health != 100) {
            health = health + 5; //recover 5 hp
            recoveryCounter = 0;
        }
        if (witchCounter == 12) {
            witchCounter = 0;
            if (gold >= 30) {
                var doublemonay = confirm("A witch offers you a 10% bonus in gold if you give 3/4 of your current gold.");
                if (doublemonay == true) {
                    multiplier = multiplier * 1.1
                    gold = gold / 4;
                    doublemonay = false
                }
            }
        }
        if (merchantCounter == 6) {
            merchantCounter = 0
            if (gold >= 17 && gold < 100) {
                var healthpots = confirm("Would you like to buy 50 hp for 17 gold?");
                if (healthpots == true) {
                    gold = gold - 17;
                    health = health + 50;
                    if (health > 100) {
                        health = 100;
                    }
                }
            }
            if (gold >= 100) {
                var healthpots = confirm("Would you like to buy 50 hp for a third of your current gold?")
                if (healthpots == true) {
                    gold = gold * 2 / 3;
                    health = health + 50;
                    if (health > 100) {
                        health = 100;
                    }
                }
            }
        }

        while (livingtest != 1) //livingtest is if geeblin is alive or not, 1 = alive, 0 = not so alive// 
        {
            var pre = getRandomInt(0, 11); //choose random preffix 
            var suf = getRandomInt(0, 11); //choose random suffix
            var enhancer = getRandomInt(0, 6);
            var adj = getRandomInt(0, 8); //and gold drop
            var namespre = ["Bu", "Chi", "Chu", "Du", "Tru", "Yi", "Wi", "Ra", "Po", "Cru", "Haka"];
            var namessuf = ["ngus", "mba", "dungus", "raka", "diddy", "rk", "bus", "tato", "quaca", "mongo", "vubu"];
            var nameEnhancer = ["Incredibly", "Truly", "Extremely", "Very", "Astronomically", "Super"];
            var nameAdj = ["Spooky", "Dangerous", "Strong", "Itchy", "Selfish", "Vulgar", "Greedy", "Normal"];
            var geeblin = "The " + nameEnhancer[enhancer] + " " + nameAdj[adj] + " " + namespre[pre] + namessuf[suf];
            var livingtest = 1; //revive geeblin
            var damage = getRandomInt(5, 14);
        }
        if (health > 0 && health != 0 && end != 1) {
            gold = gold + adj * multiplier;
            var livingtest = 0;
            health = health - damage;
            if (health <= 0) {
                end = 1;
                $scope.loseMessage = "You ded. " + "Score: " + gold; //lose message

               
            }
            $scope.geeblinMessage = "You have slain " + " " + geeblin; //geeblin death message
            $scope.goldMessage = "You have gained " + multiplier * adj + " gold!" + " Gold: " + gold; //gold gained and total

            $scope.healthMessage = "You now have " + health + "/100 HP"; //current hp / total hp
        }
        
    }
});
