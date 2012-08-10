var isNode = false;

if( typeof module != 'undefined' && module.exports )
{
	isNode = true;
	var TaskDateAdapter = {}
}


TaskDateAdapter.UnixTimestamp = function( timestamp ){

	return new Date( timestamp * 1000 );
}


if( isNode )
{
	module.exports = TaskDateAdapter.UnixTimestamp;
}