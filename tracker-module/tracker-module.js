// version 1.0.0.1
angular.module('rasm-tracker',['ngMdIcons']) 
	.directive('timeTracker',timeTracker);

function timeTracker(){
    var directive= {
        restrict: 'E'
        , template: `<div flex="25">
                       <md-card>
                          <md-card-content  style="background-color: rgba(0, 0, 0, 0.09);cursor: move;">
                             <div>
                                <label style="font-size: 16px;position: relative;top: -4px;">{{vm.timeStatus | timerFilter }}</label>  
                                <md-button ng-show="vm.startButton" type="button" class="md-icon-button" ng-click="vm.startTimer()" autofocus>
                                    <ng-md-icon icon="play_arrow" size="22"></ng-md-icon>
                                   <md-tooltip>Start</md-tooltip>
                                </md-button>
                                <md-button ng-show="vm.pauseButton" type="button" class="md-icon-button" ng-click="vm.pauseTimer()" >
                                    <ng-md-icon icon="pause" size="22"></ng-md-icon>
                                    <md-tooltip>Pause</md-tooltip>
                                </md-button>
                                <md-button ng-show="vm.stopButton" type="button" class="md-icon-button" ng-click="vm.stopTimer()" >
                                    <ng-md-icon icon="stop" size="22"></ng-md-icon>
                                    <md-tooltip>Stop</md-tooltip>
                                </md-button>
                                <md-button type="button" class="md-icon-button" ng-click="vm.resetTimer()">
                                   <ng-md-icon icon="autorenew" size="22"></ng-md-icon>
                                   <md-tooltip>Reset</md-tooltip>
                                </md-button>
                             </div>
                             <div ></div>
                          </md-card-content>
                       </md-card>
                    </div>`
        , controller: timeTrackerCtrl
        , controllerAs : 'vm'
        , scope: {
            config: '=',
            stopFunc : '&'
        }
    }
    return directive;            
};

timeTrackerCtrl.$inject = ["$scope", "$interval", "$timeout", "$window"];
      
function timeTrackerCtrl($scope, $interval, $timeout, $window){
    var vm = this;

    vm.timeStatus = 0;
    //vm.startTime = 0;
    vm.lapTime = 0;
    vm.laps = [];
    vm.timerStatus = false;
    vm.todayDate = new Date();
    $timeout(function () {
        vm.startButton = true;
        vm.stopButton = false;
        vm.pauseButton = false;
        vm.initCatch();
    }, 1000);

    vm.initCatch = function () {
        if (!vm.config || !vm.config.cacheName) {
            vm.config = {'cacheName': "default"}
        }
        if (localStorage.getItem(vm.config.cacheName)) {
            vm.remainTime = localStorage.getItem(vm.config.cacheName);
            console.log(JSON.parse(vm.remainTime));
            var arr = JSON.parse(vm.remainTime);
            if (vm.remainTime) {
                vm.startButton = false;
                vm.stopButton = true;
                vm.pauseButton = true;
                var strtTime = arr[0]['startTime'];

                vm.timeDiff = new Date()
                    .getTime() - new Date(strtTime)
                    .getTime();
                console.log((vm.timeDiff))
                vm.timeStatus = vm.timeDiff / 10;
                runTimer();
            };
        };
    }

    function saveToCatch() {
        var arr = [];
        var jsonArr = [];
        if (window.localStorage) {
            if (localStorage.getItem(vm.config.cacheName)) {
                var arr = localStorage.getItem(vm.config.cacheName);
                var jsonArr = JSON.parse(arr);
                console.log(JSON.stringify(jsonArr))
                localStorage.setItem(vm.config.cacheName, JSON.stringify(jsonArr));
            }
        }
    }

    window.addEventListener("focus", function (event) {
        console.log("focus")
        vm.initCatch();
    });

    window.addEventListener("blur", function (event) {
        console.log("blur")
        saveToCatch();
    });

    window.addEventListener("beforeunload", function (e) {
        console.log("close working")
        saveToCatch();
    });

    vm.startTimer = function () {
        vm.startTime = vm.timeStatus;
        vm.startButton = false;
        vm.stopButton = true;
        vm.pauseButton = true;
        // catch data 
        if (!localStorage.getItem(vm.config.cacheName)) {
            var testObject = [{
                name: vm.config.cacheName
                , startTime: new Date()
        }];
            localStorage.setItem(vm.config.cacheName, JSON.stringify(testObject));
        };
        runTimer();
    }

    vm.pauseTimer = function () {
        vm.pauseButton = false;
        vm.startButton = true;
        vm.timerStatus = !vm.timerStatus;
        if (vm.timeRun) {
            $interval.cancel(vm.timeRun);
            vm.startTime = vm.timeStatus;
        }
        console.log(vm.timeStatus / 100);
        vm.result = vm.timeStatus;
    }

    function runTimer() {
        if (vm.timeRun) {
            $interval.cancel(vm.timeRun);
        }
        vm.timeUpdate = function () {
            vm.timeStatus++;
        }
        vm.timeRun = $interval(vm.timeUpdate, 10);
    }

    vm.stopTimer = function () {
        vm.startButton = true;
        vm.stopButton = false;
        vm.pauseButton = false;
        if (window.localStorage) {
            localStorage.removeItem(vm.config.cacheName);
        };
        vm.timerStatus = !vm.timerStatus;
        if (vm.timeRun) {
            $interval.cancel(vm.timeRun);
            vm.startTime = vm.timeStatus;
        }
        console.log(vm.timeStatus / 100);
        vm.result = vm.timeStatus;
        $scope.stopFunc({time: vm.timeStatus/ 100});
        vm.timeStatus = 0;
    }

    vm.resetTimer = function () {
        vm.startButton = true;
        vm.stopButton = false;
        vm.pauseButton = false;
        if (window.localStorage) {
            localStorage.removeItem(vm.config.cacheName);
        };
        vm.timeStatus = 0;
        vm.laps = [];
        $interval.cancel(vm.timeRun);
    }

    vm.lapTimer = function () {
        //console.log("Start Time 0: " + vm.startTime);
        vm.lapTime = vm.timeStatus - vm.startTime;
        //console.log("Status Time : " + vm.timeStatus);
        //console.log(vm.lapTime + " = " + vm.timeStatus + " - " +  vm.startTime);
        vm.startTime = vm.timeStatus;
        vm.laps.push(vm.lapTime);
    }

    vm.getTotal = function () {
        var total = 0;
        if (vm.laps.length == 0) {
            total = 0;
        } else {
            for (var i = 0; i < vm.laps.length; i++) {
                total += vm.laps[i];
            }
            return total / 100 + " Sec";
        }
    }
};

angular.module('rasm-tracker')
	.filter('timerFilter',timerFilter);

timerFilter.$inject = [];

function timerFilter(){
    return function (time) {
        var ms = time;
        var seconds = Math.floor(ms / 100) % 60;
        var minutes = Math.floor(ms / 6000);
        var hours = Math.floor(ms / 360000);
        //var days = Math.floor(ms/ 8640000);
        if (minutes >= 60) minutes = minutes % 60;
        //if (hours >= 24) hours = hours % 24;
        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        // return hours+':'+minutes+':'+seconds+':'+(ms%100);
        return hours + 'h ' + minutes + 'm ' + seconds + 's';
    }
}
angular.module('rasm-tracker')
    .directive('dragTracker',dragMe);

    dragMe.$inject = [];

    function dragMe(){
        return {
            restrict: 'A',
            link: function(scope, elem, attr, ctrl) {
                elem.draggable(); 

            }
        };
    }