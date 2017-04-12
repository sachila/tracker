# tracker

simple angular material time tracker 

## Requirements
 - Angularjs
 - Angular Material 
 - Angular Material icon
 - jquery ui
 
 ## Installing
 install the `tracker-module` using bower 
 
 `bower install time-tracker`
 
 ### Add files

Add the scripts to your application. Make sure the `tracker-module.js` file is inserted **after** the `angular.js` library:

```html
<link rel="stylesheet" href="bower_components/angular-material/angular-material.min.css">  

<script type="text/javascript" src="bower_components/angular/angular.js"></script>
<script type="text/javascript" src="bower_components/angular-aria/angular-aria.js"></script>
<script type="text/javascript" src="bower_components/angular-animate/angular-animate.min.js"></script> 
<script type="text/javascript" src="bower_components/angular-material/angular-material.js"></script>
<script type="text/javascript" src="bower_components/angular-material-icons/angular-material-icons.min.js"></script>

<script type="text/javascript" src="bower_components/material-time-tracker/tracker-module/tracker-module.js"></script>
 
```

### Add a dependancy

Add the time tracker module as a dependancy to your application module. since angular material beign used inject the `ngAnimate` and `ngAria` modules along with the `ngMaterial` module:

```js
angular.module("app",['ngMaterial','ngAnimate', 'ngAria','rasm-tracker'])
```

### basic tracker 

in the html add tracker as element like this 

```html
<div ng-app="app" ng-controller="ctrl as vm"> 
	<time-tracker></time-tracker> 
</div>
```

### Events

There are couple of events available in time tracker

- start event

add `start-func` as attribute to the element and call controller function

```html 
 <time-tracker start-func="vm.startF(time)"></time-tracker> 
``` 
current time pass as argument to the function.

```js
.controller("ctrl",function($scope){
	var vm = this;
	vm.startF = function(time){
	   console.log("start time " + time)
	}
})
```
- stop event

same as start event. just add `stop-func` to the element 
```html 
 <time-tracker stop-func="vm.stopF(time)"></time-tracker> 
``` 


- reset event

same as start event. just add `reset-func` to the element 
```html 
 <time-tracker reset-func="vm.resetF(time)"></time-tracker> 
``` 

- pause event

same as start event. just add `pause-func` to the element 
```html 
 <time-tracker pause-func="vm.pauseF(time)"></time-tracker> 
``` 

##Draggable

in ordert to drag the time tracker, First of all we need to add jquery libraries. Add these scripts to your application.

```html
<script type="text/javascript" src="bower_components/jquery/dist/jquery.js"></script>
<script type="text/javascript" src="bower_components/jquery-ui/jquery-ui.min.js"></script>
```

Then add the `drag-tracker` attribute to the tracker 

<time-tracker drag-tracker  stop-func="vm.stopF(time)"  start-func="vm.startF(time)" reset-func="vm.resetF(time)" pause-func="vm.pauseF(time)"></time-tracker> 



