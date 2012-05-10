;(function(){

	"use strict";

	window.TaskDateAdapter = {}

	TaskDateAdapter = {}

	window.TaskScheduler = function( title )
	{
		this.title = title;

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
		},

		getCurrentDate: function()
		{
			return new Date();
		}	

	}

	TaskScheduler.prototype = {


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


		after: function( targetDate )
		{

			var currentDate = TaskSchedulerUtil.getCurrentDate();


			if( currentDate > targetDate )
			{
				this.runTasks();
			}

		},

		before: function( targetDate )
		{

			var currentDate = TaskSchedulerUtil.getCurrentDate();
			

			if( currentDate < targetDate )
			{
				this.runTasks();
			}
			
		},

		on: function( targetDate, checkTime )
		{

			if( checkTime == undefined ) checkTime = false;


			var currentDate = TaskSchedulerUtil.getCurrentDate();
			

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


})();