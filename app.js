
angular.module("app",['ngAria','ngAnimate','ngMaterial','rasm-tracker'])
.controller("ctrl",function($scope){

	var vm = this;  
	
	vm.stopF = function(time){
		console.log("stop time " + time)
	}
	vm.pauseF = function(time){
		console.log("pause time " + time)
	}
	vm.resetF = function(time){
		console.log("reset time " + time)
	}
	vm.startF = function(time){
		console.log("start time " + time)
	}
})
 