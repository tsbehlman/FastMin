"use strict";

const REGULAR =				0;
const SPACE =				1;
const DOUBLE_QUOTES =		2;
const SINGLE_QUOTES =		3;
const TAG = 					4;
const TAG_SPACE = 			5;

module.exports.initialize = function() {
	this.state = SPACE;
}

module.exports.processChar = function( c, output, outputIndex ) {
	switch( this.state ) {
	case DOUBLE_QUOTES:
		if( c === 34 ) {						// 34 === '"'
			this.state = TAG_SPACE;
		}
		output[ outputIndex++ ] = c;
		break;
	case SINGLE_QUOTES:
		if( c === 39 ) {						// 39 === "'"
			this.state = TAG_SPACE;
		}
		output[ outputIndex++ ] = c;
		break;
	case TAG_SPACE:
		if( c <= 32 ) {						// 32 === ' '
			break;
		}
		else {
			this.state = TAG;
		}
	case TAG:
		if( c <= 32 ) {						// 32 === ' '
			this.state = TAG_SPACE;
		}
		else if( c === 34 ) {				// 34 === '"'
			this.state = DOUBLE_QUOTES;
		}
		else if( c === 39 ) {				// 39 === "'"
			this.state = SINGLE_QUOTES;
		}
		else if( c === 62 ) {				// 62 === '>'
			this.state = REGULAR;
		}
		output[ outputIndex++ ] = c;
		break;
	case SPACE:
		if( c <= 32 ) {						// 32 === ' '
			break;
		}
		else {
			this.state = REGULAR;
		}
	case REGULAR:
		if( c <= 32 ) {						// 32 === ' '
			this.state = SPACE;
		}
		else if( c === 60 ) {				// 60 === '<'
			this.state = TAG;
		}
		output[ outputIndex++ ] = c;
		break;
	}

	return outputIndex;
}
