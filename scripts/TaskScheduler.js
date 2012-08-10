;(function(){

	"use strict";

	var isNode = false;

	if( typeof module != 'undefined' && module.exports )
	{
		isNode = true;
		var window = {}
	}


	window.TaskDateAdapter = {}


	window.TaskScheduler = function( title )
	{
		this.title = title;
		this.currentDate = null;

		this.callbacks = [];

		return this;
	}

	window.TaskSchedulerUtil = {

		/*
		*	return mm/dd/yyyy from the Date object
		*/
		getMonthDateYear: function( dateObj )
		{
			return dateObj.getMonth() + 1 + "/" + dateObj.getDate() + "/" + dateObj.getFullYear();
		}	

	}

	window.TaskScheduler.prototype = {

		setCurrentDate: function( JSDate )
		{
			if( JSDate instanceof Date)
			{
				this.currentDate = JSDate;
			}
			else
			{
				throw(JSDate + "is not an instance of Date object");
			}
		},

		getCurrentDate: function()
		{
			return new Date();
		},

		runTask: function( callbackArray )
		{
			var i;

			for(i = 1; i<= callbackArray[1]; i++)
			{
				callbackArray[0]( i );
			}

		},

		runTasks: function()
		{

			var i;


			for( i in this.callbacks )
			{
				if( this.callbacks.hasOwnProperty(i) )
				{
					// this.callbacks[i]();
					this.runTask( this.callbacks[i] );

				}
			}

		},

		run: function( callback, repeat )
		{
			if( typeof callback === "function" )
			{
				
				if(  repeat == undefined ) repeat = 1;

				this.callbacks.push( new Array(callback,repeat) );
			} 

			return this;
		},

		between: function( fromDate, toDate )
		{

			

			var currentDate;
			if( this.currentDate == null )
			{
				currentDate = this.getCurrentDate();
			}
			else
			{
				currentDate = this.currentDate;
			}


			currentDate = currentDate.getTime();


			fromDate = fromDate.getTime();
			toDate = toDate.getTime();


			if( currentDate >= fromDate && currentDate <= toDate)
			{
				this.runTasks();
			}


		},

		after: function( targetDate )
		{

			var currentDate;
			if( this.currentDate == null )
			{
				currentDate = this.getCurrentDate();
			}
			else
			{
				currentDate = this.currentDate;
			}


			if( currentDate > targetDate )
			{
				this.runTasks();
			}

		},

		before: function( targetDate )
		{

			var currentDate;
			if( this.currentDate == null )
			{
				currentDate = this.getCurrentDate();
			}
			else
			{
				currentDate = this.currentDate;
			}			

			if( currentDate < targetDate )
			{
				this.runTasks();
			}
			
		},

		on: function( targetDate, checkTime )
		{

			if( checkTime == undefined ) checkTime = false;


			var currentDate;
			if( this.currentDate == null )
			{
				currentDate = this.getCurrentDate();
			}
			else
			{
				currentDate = this.currentDate;
			}


			if( checkTime )
			{


				// comparing the objects would not work
				if( currentDate.getTime() == targetDate.getTime() )
				{
					this.runTasks();
				}
				
			}
			else
			{
				var stringifiedCurrentDate = TaskSchedulerUtil.getMonthDateYear( currentDate );
				var stringifiedTargetDate = TaskSchedulerUtil.getMonthDateYear( targetDate );


				if( stringifiedTargetDate == stringifiedCurrentDate )
				{
					this.runTasks();
				}
			}


		}

	}

	if( isNode )
	{
		module.exports = window.TaskScheduler;
	}


})();
