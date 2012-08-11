var Task = require("./scripts/TaskScheduler");
var StringAdapter = require("./scripts/Adapters/String");


var testTask = new Task;

// for the testing purpose, force the current date of this object to 5/25/2012 6:00pm
testTask.setCurrentDate( new Date(2012, 4, 25, 18, 0, 0, 0) );


// outputs 1 if current date is in between 5/25/2012 5:00 pm and 6/25/2012
testTask.run(function(index){

	console.log(index);
	
}).between( StringAdapter("5/25/2012 5:00pm"), StringAdapter("6/25/2012") );