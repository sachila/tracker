
angular.module("app",['ngAria','ngAnimate','ngMaterial','rasm-tracker'])
.controller("ctrl",function($scope){

	var vm = this;  
	
	vm.stopF = function(time){
		console.log(time)
	}
})

 