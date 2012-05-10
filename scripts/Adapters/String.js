/*
*	String Date
*	Possible formats	
*	5/26/2012 3:20am
*	5/26/2012
*	5/26/2012 3am
*	midnight = 12 am
*	noon = 12 pm
*	FYI :)
**/
TaskDateAdapter.String = function( mdyyyy )
{

	// this.date = mmddyyyy;

	this.data = {

		month: null,
		day: null,
		year: null,
		hour: null,		
		minute: null,
		ampm: null

	}

	var splitted = mdyyyy.split(" ");
	var splittedLength = splitted.length;

	var ampm;
	var time;

	switch( splittedLength )
	{
		case 1:
			this.mode = "dateOnly";
			break;
		case 2:
			this.mode = "dateWithTime";
			break;
		default:
			throw("invalid date format provided: " + mmddyyyy );
			break;
	}

	var date = splitted[0].split("/");



	this.data.month = parseInt( date[0] ) - 1;
	this.data.day = parseInt( date[1] );
	this.data.year = parseInt( date[2] );


	if( this.mode == "dateWithTime" )
	{
		time = splitted[1];


		ampm = time.substr( time.length - 2 );

		

		if( ampm != 'am' && ampm != 'pm' )
		{
			throw("please indicate am or pm correctly");
		}

		this.data.ampm = ampm;

		// do we have seconds?

		var _splittedTime = time.split(":");

		var hour = parseInt( _splittedTime[0].split( ampm )[0] );


		if( hour == '12' && ampm == 'am' )
		{
			this.data.hour = 0;
		}
		else if( hour == '12' && ampm == 'pm' )
		{
			this.data.hour = 12;
		}
		else
		{

			if( ampm == 'pm' )
			{
				this.data.hour = hour + 12;
			}
			else
			{
				this.data.hour = hour;
			}
		}


		if( _splittedTime.length == 2 )
		{
			this.data.minute = parseInt( _splittedTime[1].split( ampm )[0] );
		}

	}

	return new Date(

		this.data.year,
		this.data.month,
		this.data.day,
		this.data.hour,
		this.data.minute,
		0,
		0
	);	

}