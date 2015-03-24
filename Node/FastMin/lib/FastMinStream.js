"use strict";

const Transform = require( 'stream' ).Transform;
const inherits = require( 'util' ).inherits;

function _transform( chunk, encoding, done ) {
	const length = chunk.length;
	const output = new Buffer( length );
	let chunkIndex = 0;
	let outputIndex = 0;

	while( chunkIndex < length ) {
		outputIndex = this.processChar( chunk[ chunkIndex++ ], output, outputIndex );
	}

	this.push( output.slice( 0, outputIndex ) );

	done();
}

function makeStream( minifier ) {
	var stream = function() {
		minifier.call( this );
	
		Transform.call( this );
	};
	
	inherits( stream, Transform );
	
	stream.prototype.resetState = minifier.prototype.resetState;
	stream.prototype.processChar = minifier.prototype.processChar;
	stream.prototype._transform = _transform;
	
	return stream;
}

module.exports.HTML = makeStream( require( './HTMLMinifier' ) );
module.exports.CSS = makeStream( require( './CSSMinifier' ) );
module.exports.JS = makeStream( require( './JSMinifier' ) );
