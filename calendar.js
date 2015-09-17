var worlds = [1,2,4,5,6,9,10,12,14,15,16,18,21,22,23,24,25,26,27,28,30,31,32,35,36,37,39,40,42,44,45,46,48,49,50,51,52,53,54,56,58,59,60,62,63,64,65,66,67,68,69,70,71,72,73,74,76,77,78,79,82,83,84,85,86,87,88,89,91,92,96,97,98,99,100,103,104,105,106,114,115,116,117,119,123,124,134,137,138,139,140];
var tickLength = 5000; // how long to wait for the timers

var app = angular.module('trees', ['ui.slider']);

app.controller('main', ['$scope','$timeout', function($scope, $timeout){
	$scope.worldcolors = ["white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white"];
	$scope.timer = 0;
	$scope.checker = true;
	$scope.front = true;
	$scope.clicked = -1;
	$scope.t = [];
	$scope.getList = function(){
		return worlds;
	}
	$scope.getColumns = function($index){
		var result = "";
		var pick = ($index)%5;
		switch(pick){
			case 0:
				result = "col-md-2 col-md-offset-1";
				break;
			default:
				result = "col-md-2";
				break;
		}
		return result;
	}
	$scope.numWorlds = worlds.length;

	$scope.getColor = function($index){
		return worldcolors[$index];
	}

	$scope.changeColor = function(n, t){
		if(n == undefined){
			place = worlds.indexOf(parseInt(t));
			$scope.worldcolors[place] = "white";
		} else if(n <= 5){
			place = worlds.indexOf(parseInt(t));
			$scope.worldcolors[place] = "yellow";
		} 
	}

	$scope.clickOn = function($event, $index){
		$scope.checker = !($scope.checker);
		if($scope.clicked === $index){
			$scope.clicked = -1;
		} else {
			$scope.clicked = $index;
		}
	}

	$scope.counter = 0;
    $scope.onTimeout = function(){
        $scope.counter++;
        mytimeout = $timeout($scope.onTimeout,tickLength);
		for(i in $scope.t){
			$scope.t[i]--;
			if($scope.t[i] >= -10 && $scope.t[i] <= 0){
				place = worlds.indexOf(parseInt(i));
				$scope.worldcolors[place] = "green";
			} else if($scope.t[i] <= 5 && $scope.t[i] > 0){
				place = worlds.indexOf(parseInt(i));
				$scope.worldcolors[place] = "yellow";
			} else {
				place = worlds.indexOf(parseInt(i));
				$scope.worldcolors[place] = "white";
			}
		}
		for(i in $scope.t){
			if($scope.t[i] < -10){
				delete $scope.t[i];
			}
		}
    }
    var mytimeout = $timeout($scope.onTimeout,tickLength);

}]);
