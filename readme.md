#  TaskScheduler.js – Run a task on, before, after a date

This is beta version.

Tested on 

Chrome 18+
Safari 5.1+
IE 6+


## Usage

Download [TaskScheduler.min.js](https://raw.github.com/kmk1986/TaskScheduler/master/scripts/TaskScheduler.min.js) and include it in your HTML document:

```html
<script src="TaskScheduler.min.js"></script>
```

## new TaskScheduler("name of your task")

Creates an instance of TaskScheduler object.

## .run( callback )

```javascript
new TaskScheduler("test task").run(function(){
	
	// do something;

});
```

You can also speicify how many times your task should run. The default value is 1.

```javascript
new TaskScheduler("test task").run(function(index){
	
	console.log(index); // output: 1,2,3,4,5,6,7,8,9,10 

},10);
```

You can also add multiple callbacks.

```javascript

function callback1(){}
function callback2(){}
function callback3(){}

new TaskScheduler("test task").run( callback1 )
                              .run( callback2 )
                              .run( callback3 );

```

This doesn't do anything until you call one of the following methods (before, on, after)

## .before

```javascript
new TaskScheduler("test task").run(function(){
	
	// do something

}).before( new TaskDateAdapter.String("5/26/2012") );
```

The callback runs until end of 5/25/2012


## .on

```javascript
new TaskScheduler("test task").run(function(){
	
	// do something

}).on( new TaskDateAdapter.String("5/26/2012") );
```

The callback runs on 5/26/2012 (all day)

```javascript
new TaskScheduler("test task").run(function(){
	
	// do something

}).on( new TaskDateAdapter.String("5/26/2012 6:00pm") );
```
The callback runs 5/26/2012 6pm exactly

## .after

```javascript
new TaskScheduler("test task").run(function(){
	
	// do something

}).after( new TaskDateAdapter.String("5/26/2012") );
```

The callback runs after 5/26/2012






