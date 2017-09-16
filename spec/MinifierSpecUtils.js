const { PassThrough } = require( "stream" );

const STREAM_CHUNK_SIZE = 8;

module.exports.verifyWrapper = function( wrapper, input, expected ) {
	expect( wrapper( input ) ).toBe( expected );
}

module.exports.verifyDirectInvocation = function( minifierType, input, expected ) {
	const minifier = new minifierType();
	const actualBuffer = new Buffer( input.length );
	let actualIndex = 0;

	for( let i = 0; i < input.length; i++ ) {
		actualIndex = minifier.processChar( input.charCodeAt( i ), actualBuffer, actualIndex );
	}

	const actualStyle = actualBuffer.toString( "utf8", 0, actualIndex );

	expect( actualStyle ).toBe( expected );
}

module.exports.verifyStream = function( minifierStreamType, input, expected ) {
	const reader = new PassThrough();
	let actual = "";

	reader.on( "data", function( chunk ) {
		actual += chunk.toString();
	} );

	const minifier = new minifierStreamType();
	minifier.pipe( reader );

	const expectedBuffer = Buffer.from( input, "ascii" );
	let expectedIndex = 0;
	

	while( expectedIndex < expectedBuffer.length ) {
		let endIndex = Math.min( expectedIndex + STREAM_CHUNK_SIZE, expectedBuffer.length );
		minifier.write( expectedBuffer.slice( expectedIndex, endIndex ) );
		expectedIndex = endIndex;
	}

	minifier.end();

	expect( actual ).toBe( expected );
}