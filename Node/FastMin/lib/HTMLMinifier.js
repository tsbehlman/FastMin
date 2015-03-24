"use strict";

const Matcher = require( 'Matcher' );

const JSFastMin = require( './JSMinifier' );
const CSSFastMin = require( './CSSMinifier' );
const Noop = require( './NoopMinifier' );

const REGULAR =				0;
const SPACE =				1;
const DOUBLE_QUOTES =		2;
const SINGLE_QUOTES =		3;
const TAG_NAME =				4;
const TAG_SPACE = 			5;
const TAG = 					6;
const TAG_SPECIAL =			7;
const TAG_CLOSE =			8;

const tagNames = [
	"pre",
	"script",
	"style"
];

const subMinifiers = [
	Noop,
	JSFastMin,
	CSSFastMin
];

function HTMLMinifier() {
	this.resetState();
}

HTMLMinifier.prototype.resetState = function() {
	this.state = SPACE;
	this.matcher = new Matcher( tagNames, false );
	this.subMinifier = null;
}

HTMLMinifier.prototype.processChar = function( c, output, outputIndex ) {
	
	if( this.subMinifier === null && c < 32 ) {
		c = 32;
	}
	
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
	case TAG_NAME:
		if( c <= 32 || c === 62 ) {			// 32 === ' ', 62 === '>'
			let subMinifierIndex = this.matcher.getMatchIndex();
			if( subMinifierIndex >= 0 ) {
				this.subMinifier = new subMinifiers[ subMinifierIndex ]();
				this.state = c <= 32 ?
					TAG_SPACE :
					TAG_SPECIAL;
			}
			else {
				this.state = c <= 32 ?
					TAG_SPACE :
					REGULAR;
			}
			this.matcher.reset();
		}
		else if( c === 47 ) {				// 47 === '/'
			this.state = REGULAR;
		}
		else {
			this.matcher.matchCharCode( c );
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
		if( c === 62 ) {						// 62 === '>'
			this.state = this.subMinifier === null ?
				REGULAR :
				TAG_SPECIAL;
		}
		else if( c <= 32 ) {					// 32 === ' '
			this.state = TAG_SPACE;
		}
		else if( c === 34 ) {				// 34 === '"'
			this.state = DOUBLE_QUOTES;
		}
		else if( c === 39 ) {				// 39 === "'"
			this.state = SINGLE_QUOTES;
		}
		output[ outputIndex++ ] = c;
		break;
	case TAG_SPECIAL:
		if( c === 60 ) {						// 60 === '<'
			this.state = TAG_CLOSE;
			break;
		}
		outputIndex = this.subMinifier.processChar( c, output, outputIndex );
		break;
	case TAG_CLOSE:
		if( c === 47 ) {						// 47 === '/'
			this.state = REGULAR;
			this.subMinifier = null;
			output[ outputIndex++ ] = 60;	// 60 === '<'
			output[ outputIndex++ ] = c;
		}
		else {
			this.state = TAG_SPECIAL;
			outputIndex = this.subMinifier.processChar( 60, output, outputIndex );	// 60 === '<'
			outputIndex = this.subMinifier.processChar( c, output, outputIndex );
		}
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
			this.state = TAG_NAME;
		}
		output[ outputIndex++ ] = c;
		break;
	}

	return outputIndex;
};

module.exports = HTMLMinifier;
