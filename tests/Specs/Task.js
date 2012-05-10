describe("Task with String Adapater", function(){

	var TestTask;
	var TempVar;

	// override getCurrentDate method to inject our own date for testing
	TaskSchedulerUtil.getCurrentDate = function()
	{
		// may 25 2012
		return new Date(2012, 4, 25, 18, 0, 0, 0);
	}
	

	beforeEach(function(){

		TestTask = new TaskScheduler("test");
		TempVar = 0;


	});

	describe("Testing 'before' ", function(){


		it("should run the defined task; setting the date 5/26/2012", function(){


			TestTask.do(function( index ){

				TempVar = index;

			}).before( new TaskDateAdapter.String("5/26/2012") );

			expect( TempVar ).toEqual( 1 );

		});

		it("should not run the defined task; setting the date 5/25/2012", function(){

			TestTask.do(function( index ){

				TempVar = index;

			}).before( new TaskDateAdapter.String("5/25/2012") );

			expect( TempVar ).toEqual( 0 );

		});

		it("should run the defined task; setting the date 5/25/2012 6:1pm ", function(){

			TestTask.do(function( index ){

				TempVar = index;

			}).before( new TaskDateAdapter.String("5/25/2012 6:1pm") );

			expect( TempVar ).toEqual( 1 );

		});





	});

	describe("Testing 'after' ", function(){

		it("Run a task after 5/25/2012 5:59pm", function(){

			TestTask.do(function(index){

				TempVar = index;

			}).after( new TaskDateAdapter.String("5/25/2012 5:59pm") );

			expect( TempVar ).toEqual( 1 ); 
			
		});

		it("should not run the defined task; setting the date 5/26/2012", function(){

			TestTask.do(function(index){

				TempVar = index;

			}).after( new TaskDateAdapter.String("05/26/2012") );

			expect( TempVar ).toEqual( 0 );

		});




	});

	describe("Testing 'on' method ", function(){



		it("Run a task once on 5/25/2012; it should run only once;", function(){


			TestTask.do(function( index ){

				TempVar = index;

			}).on( new TaskDateAdapter.String("5/25/2012") );

			expect( TempVar ).toEqual( 1 );

		});


		it("Run a task once on 5/25/2012 6:00 pm; it should run only once", function(){

			TestTask.do(function(index){

				TempVar = index

			}).on( TaskDateAdapter.String("5/25/2012 6pm"), true );

			expect( TempVar ).toEqual( 1 ); 


		});

		it("Run a task once on 5/25/2012 6:00 pm; it should not run; TemVar should be 0", function(){

			TestTask.do(function(index){

				TempVar = index

			}).on( TaskDateAdapter.String("5/25/2012 7pm"), true );

			expect( TempVar ).toEqual( 0 ); 


		});

		it("Run a test 3 times on 5/25/2012; TempVar should be 6 (1+2+3)", function(){

			TestTask.do(function(index){

				TempVar += index;

			},3).on( TaskDateAdapter.String("5/25/2012") );


			expect( TempVar ).toEqual( 6 );
			

		});



	});




});
