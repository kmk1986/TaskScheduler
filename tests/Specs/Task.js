describe("Task with String Adapater", function(){

	var TestTask;
	var TempVar;




	beforeEach(function(){

		TestTask = new TaskScheduler("test");
		TestTask.setCurrentDate( new Date(2012, 4, 25, 18, 0, 0, 0) );
		
		TempVar = 0;


	});


	describe("Testing 'before' ", function(){


		it("should run the defined task; setting the date 5/26/2012", function(){


			TestTask.run(function( index ){

				TempVar = index;

			}).before( new TaskDateAdapter.String("5/26/2012") );

			expect( TempVar ).toEqual( 1 );

		});

		it("should not run the defined task; setting the date 5/25/2012", function(){

			TestTask.run(function( index ){

				TempVar = index;

			}).before( new TaskDateAdapter.String("5/25/2012") );

			expect( TempVar ).toEqual( 0 );

		});

		it("should run the defined task; setting the date 5/25/2012 6:1pm ", function(){

			TestTask.run(function( index ){

				TempVar = index;

			}).before( new TaskDateAdapter.String("5/25/2012 6:1pm") );

			expect( TempVar ).toEqual( 1 );

		});





	});

	describe("Testing 'after' ", function(){

		it("Run a task after 5/25/2012 5:59pm", function(){

			TestTask.run(function(index){

				TempVar = index;

			}).after( new TaskDateAdapter.String("5/25/2012 5:59pm") );

			expect( TempVar ).toEqual( 1 ); 
			
		});

		it("should not run the defined task; setting the date 5/26/2012", function(){

			TestTask.run(function(index){

				TempVar = index;

			}).after( new TaskDateAdapter.String("05/26/2012") );

			expect( TempVar ).toEqual( 0 );

		});




	});

	describe("Testing 'before' method", function(){

		it("Run a task between 5/25/2012 6:00 pm and 6/25/2012", function(){

			TestTask.run(function(index){

				TempVar = index;

			}).between( new TaskDateAdapter.String("5/25/2012 6:00pm"), new  TaskDateAdapter.String("6/25/2012") );

			expect( TempVar ).toEqual( 1 );

		});

		it("Should not run a task between 5:25/2012 6:01pm and 6/25/2012", function(){

			TestTask.run(function(index){

				TempVar = index;

			}).between( new TaskDateAdapter.String("5/25/2012 6:01pm"), new  TaskDateAdapter.String("6/25/2012") );

			expect( TempVar ).toEqual( 0 );


		})


	});

	describe("Testing 'on' method ", function(){



		it("Run a task once on 5/25/2012; it should run only once;", function(){


			TestTask.run(function( index ){

				TempVar = index;

			}).on( new TaskDateAdapter.String("5/25/2012") );

			expect( TempVar ).toEqual( 1 );

		});


		it("Run a task once on 5/25/2012 6:00 pm; it should run only once", function(){

			TestTask.run(function(index){

				TempVar = index

			}).on( TaskDateAdapter.String("5/25/2012 6pm"), true );

			expect( TempVar ).toEqual( 1 ); 


		});

		it("Run a task once on 5/25/2012 6:00 pm; it should not run; TemVar should be 0", function(){

			TestTask.run(function(index){

				TempVar = index

			}).on( TaskDateAdapter.String("5/25/2012 7pm"), true );

			expect( TempVar ).toEqual( 0 ); 


		});

		it("Run a test 3 times on 5/25/2012; TempVar should be 6 (1+2+3)", function(){

			TestTask.run(function(index){

				TempVar += index;

			},3).on( TaskDateAdapter.String("5/25/2012") );


			expect( TempVar ).toEqual( 6 );
			

		});



	});




});



